import { getLatestSnapshot } from "./calc-engine";
import { getX10Collaboration } from "./calc-engine";

const RULES: { match: RegExp; answer: (q: string, quarterId: string) => string }[] = [
  {
    match: /tcow|人力总成本|总成本/i,
    answer: (_, qid) => {
      const s = getLatestSnapshot(qid);
      if (!s) return "请先加载演示数据并执行核算。";
      return `本季（${qid}）人力总成本 **¥${(s.kpis.tcow / 1e8).toFixed(2)}亿**，同比演示 +6.2%。主要驱动：工程 FTE 增加、中台分摊上调。<br/><span style="font-size:0.75rem;color:#697386">来源：HR-TCOW · proxy</span>`;
    },
  },
  {
    match: /人力成本率|成本率.*最高/i,
    answer: (_, qid) => {
      const s = getLatestSnapshot(qid);
      if (!s) return "请先核算。";
      const top = [...s.plCosts].sort((a, b) => b.laborCostPct - a.laborCostPct)[0];
      return `本季人力成本率最高产品线为 **${top.plName}**（${(top.laborCostPct * 100).toFixed(1)}%）。<br/><span style="font-size:0.75rem;color:#697386">来源：proxy · ${qid}</span>`;
    },
  },
  {
    match: /10x|10×|handoff|采纳/i,
    answer: (_, qid) => {
      const x = getX10Collaboration(qid);
      const doneNoAd = (x.handoffs as { status: string }[]).filter(
        (h) => h.status === "done"
      ).length;
      return `本季 10× Handoff **${x.handoffs.length}** 项，采纳登记 **${x.adoptions.length}** 项。请关注 W8：已完成 Handoff 但采纳为 0 的条目（演示季约 ${doneNoAd} 条相关）。<br/><span style="font-size:0.75rem;color:#697386">来源：X10 台账 · proxy</span>`;
    },
  },
  {
    match: /编制达成/i,
    answer: (_, qid) => {
      const s = getLatestSnapshot(qid);
      if (!s) return "请先核算。";
      return `全公司编制达成率 **${(s.kpis.headcountAttainment * 100).toFixed(0)}%**（推演）。<br/><span style="font-size:0.75rem;color:#697386">来源：HR-HEADCOUNT-ATTAIN · proxy</span>`;
    },
  },
];

export function askCopilot(question: string, quarterId: string) {
  for (const r of RULES) {
    if (r.match.test(question)) {
      return { answer: r.answer(question, quarterId), refused: false };
    }
  }
  return {
    answer:
      "该问题超出本期规则问数范围，或假设占比过高。请换用标准问法（TCOW、人力成本率、10× 采纳、编制达成）。",
    refused: true,
  };
}
