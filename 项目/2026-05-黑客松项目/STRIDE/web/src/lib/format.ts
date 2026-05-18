export function fmtMoney(n: number) {
  if (n >= 1e8) return "\u00a5" + (n / 1e8).toFixed(2) + "\u4ebf";
  if (n >= 1e4) return "\u00a5" + (n / 1e4).toFixed(0) + "\u4e07";
  return "\u00a5" + n.toLocaleString("zh-CN");
}
