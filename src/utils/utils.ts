export function mbToBytes(mb: number) {
  return mb * 1024 ** 2;
}

export function pennyToAmount(penny: number) {
  return penny / 100;
}

export function amountToPenny(amount: number) {
  return amount * 100;
}
