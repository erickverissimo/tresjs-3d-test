export function emptyStringToNull(val?: string | null) {
  if (!val) return val;
  const trimmed = val.trim();
  return trimmed === '' ? null : trimmed;
}
