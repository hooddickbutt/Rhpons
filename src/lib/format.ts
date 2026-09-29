export function shortAddress(value: string, size = 4) {
  if (value.length < 12) return value;
  return `${value.slice(0, 6)}…${value.slice(-size)}`;
}

export function formatUnits(value: bigint, decimals: number, digits = 4) {
  const zero = BigInt(0);
  const negative = value < zero;
  const abs = negative ? -value : value;
  const base = BigInt(10) ** BigInt(decimals);
  const whole = abs / base;
  const fraction = abs % base;
  const fractionText = fraction
    .toString()
    .padStart(decimals, "0")
    .slice(0, digits)
    .replace(/0+$/, "");
  const text = fractionText ? `${whole.toString()}.${fractionText}` : whole.toString();
  return negative ? `-${text}` : text;
}

export function formatNumber(value: string | number) {
  const numeric = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(numeric)) return String(value);
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(numeric);
}

export function formatBlock(value: string) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return value;
  return new Intl.NumberFormat("en-US").format(numeric);
}

export function isPositiveDecimal(value: string) {
  return /^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(value) && Number(value) > 0;
}
