export function genId() {
  return `${new Date()
    .valueOf()
    .toString()
    .slice(-8)}-${Math.random()}`;
}
