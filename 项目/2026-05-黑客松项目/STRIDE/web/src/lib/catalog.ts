/** 演示用静态目录（与 allocation-default.json 对齐） */
export const ROLE_FAMILIES = [
  { id: "RF01", name: "算法与研究", coef: 1.35 },
  { id: "RF02", name: "工程与基础设施", coef: 1.15 },
  { id: "RF03", name: "产品", coef: 1.0 },
  { id: "RF04", name: "体验与UI设计", coef: 0.95 },
  { id: "RF05", name: "内容与IP运营", coef: 0.9 },
  { id: "RF06", name: "增长与市场", coef: 0.95 },
  { id: "RF07", name: "商务与客户", coef: 1.05 },
  { id: "RF08", name: "职能支撑", coef: 0.85 },
  { id: "RF09", name: "10x产业研究", coef: 1.4 },
] as const;

export const PRODUCT_LINES = [
  { id: "P1", name: "星野/Talkie", stage: "grow" },
  { id: "P2", name: "海螺 AI", stage: "grow" },
  { id: "P3", name: "Audio/语音", stage: "explore" },
  { id: "P4", name: "视频/Hailuo", stage: "grow" },
  { id: "P5", name: "开放平台/API", stage: "grow" },
  { id: "P6", name: "基础模型与中台", stage: "grow" },
] as const;

export const X10_PODS = [
  { id: "POD-FIN", domain: "金融", boundPl: "P5" },
  { id: "POD-IND", domain: "工业软件", boundPl: "P2" },
  { id: "POD-CHIP", domain: "芯片", boundPl: "P6" },
] as const;

export const DEFAULT_ALLOCATION: Record<string, Record<string, number>> = {
  RF01: { P1: 8, P2: 12, P3: 10, P4: 10, P5: 5, P6: 55 },
  RF02: { P1: 10, P2: 15, P3: 5, P4: 15, P5: 10, P6: 45 },
  RF03: { P1: 25, P2: 20, P3: 5, P4: 15, P5: 15, P6: 20 },
  RF04: { P1: 20, P2: 25, P3: 5, P4: 20, P5: 10, P6: 20 },
  RF05: { P1: 85, P2: 5, P3: 0, P4: 5, P5: 0, P6: 5 },
  RF06: { P1: 40, P2: 15, P3: 5, P4: 10, P5: 20, P6: 10 },
  RF07: { P1: 5, P2: 5, P3: 0, P4: 0, P5: 80, P6: 10 },
  RF08: { P1: 15, P2: 15, P3: 5, P4: 10, P5: 15, P6: 40 },
  RF09: { P1: 0, P2: 10, P3: 0, P4: 0, P5: 40, P6: 50 },
};

export const DEFAULT_FTE: Record<string, number> = {
  RF01: 118,
  RF02: 210,
  RF03: 86,
  RF04: 42,
  RF05: 55,
  RF06: 38,
  RF07: 28,
  RF08: 52,
  RF09: 18,
};

export const PL_REVENUE_SHARE: Record<string, number> = {
  P1: 0.28,
  P2: 0.22,
  P3: 0.06,
  P4: 0.18,
  P5: 0.2,
  P6: 0.06,
};
