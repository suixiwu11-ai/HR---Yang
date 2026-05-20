import { getLatestSnapshot, getX10Collaboration } from "./calc-engine";
import { chatCompletion, isLlmEnabled, markdownToHtml, type ChatMessage } from "./llm";

const RULES: {
  match: RegExp;
  answer: (q: string, quarterId: string) => Promise<string>;
}[] = [
  {
    match: /tcow|人力总成本|总成本/i,
    answer: async (_, qid) => {
      const s = await getLatestSnapshot(qid);
      if (!s) return "请先加载演示数据并执行核算。";
      return `本季（${qid}）人力总成本 **¥${(s.kpis.tcow / 1e8).toFixed(2)}亿**。<br/><span style="font-size:0.75rem;color:#697386">来源：HR-TCOW · proxy</span>`;
    },
  },
  {
    match: /人力成本率|成本率.*最高/i,
    answer: async (_, qid) => {
      const s = await getLatestSnapshot(qid);
      if (!s) return "请先核算。";
      const top = [...s.plCosts].sort((a, b) => b.laborCostPct - a.laborCostPct)[0];
      return `本季人力成本率最高产品线为 **${top.plName}**（${(top.laborCostPct * 100).toFixed(1)}%）。<br/><span style="font-size:0.75rem;color:#697386">来源：proxy</span>`;
    },
  },
  {
    match: /10x|10×|handoff|采纳/i,
    answer: async (_, qid) => {
      const x = await getX10Collaboration(qid);
      return `本季 10× Handoff **${x.handoffs.length}** 项，采纳 **${x.adoptions.length}** 项。<br/><span style="font-size:0.75rem;color:#697386">来源：X10 · proxy</span>`;
    },
  },
  {
    match: /编制达成/i,
    answer: async (_, qid) => {
      const s = await getLatestSnapshot(qid);
      if (!s) return "请先核算。";
      return `编制达成率 **${(s.kpis.headcountAttainment * 100).toFixed(0)}%**。<br/><span style="font-size:0.75rem;color:#697386">来源：proxy</span>`;
    },
  },
];

async function buildDataContext(quarterId: string): Promise<string> {
  const s = await getLatestSnapshot(quarterId);
  if (!s) {
    return JSON.stringify({ quarterId, error: "no_snapshot", hint: "请先加载演示数据并核算" });
  }
  const x10 = await getX10Collaboration(quarterId);
  return JSON.stringify(
    {
      quarterId,
      disclaimer: "推演数据，非官方 HR/财务数据",
      kpis: s.kpis,
      plCosts: s.plCosts,
      tcowStructure: s.tcowStructure,
      warnings: s.warnings,
      x10: {
        handoffCount: x10.handoffs.length,
        adoptionCount: x10.adoptions.length,
        handoffs: (x10.handoffs as { title: string; status: string }[]).slice(0, 8),
      },
    },
    null,
    2
  );
}

async function askByRules(question: string, quarterId: string) {
  for (const r of RULES) {
    if (r.match.test(question)) {
      return { answer: await r.answer(question, quarterId), refused: false, mode: "rules" as const };
    }
  }
  return {
    answer:
      "该问题超出规则问数范围。请换用标准问法，或配置 LLM_API_KEY 启用智能问数。",
    refused: true,
    mode: "rules" as const,
  };
}

export async function askCopilot(
  question: string,
  quarterId: string,
  history: { role: "user" | "assistant"; content: string }[] = []
) {
  if (!isLlmEnabled()) {
    return askByRules(question, quarterId);
  }

  try {
    const system: ChatMessage = {
      role: "system",
      content: `你是 STRIDE 人力洞察 Copilot。你只能根据【本季数据包】回答，禁止编造未给出的数字。
回答要求：简体中文；关键数字用 **加粗**；每条结论注明来源（proxy/推演/假设）；若数据包无相关信息，明确说无法从当前快照回答。
本季数据包（JSON）：
${await buildDataContext(quarterId)}`,
    };

    const messages: ChatMessage[] = [
      system,
      ...history.slice(-8).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
      { role: "user", content: question },
    ];

    const raw = await chatCompletion(messages);
    if (!raw) return askByRules(question, quarterId);

    const foot =
      '<br/><span style="font-size:0.75rem;color:#697386">来源：核算快照 · LLM 解读（推演数据）</span>';
    return {
      answer: markdownToHtml(raw) + foot,
      refused: false,
      mode: "llm" as const,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const isAuth =
      /401|invalid.*api.*key|authentication/i.test(msg) ||
      /未授权|无效.*Key/i.test(msg);
    if (isAuth) {
      return {
        answer: `<strong>智能问数鉴权失败</strong><br/>${msg}`,
        refused: true,
        mode: "error" as const,
      };
    }
    const fallback = await askByRules(question, quarterId);
    return {
      answer: `智能问数暂时不可用（${msg}），已切换规则回答。<br/>${fallback.answer}`,
      refused: false,
      mode: "fallback" as const,
    };
  }
}
