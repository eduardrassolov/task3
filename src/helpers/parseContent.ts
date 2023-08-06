export function parseDate(str: string) {
  const datePattern = /\d{1,2}\/\d{1,2}\/\d{4}/g;
  return str.match(datePattern)?.join(", ") || "";
}
