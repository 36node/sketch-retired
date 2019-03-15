export function isNumeric(num) {
  return !isNaN(num);
}

export function safeToNumber(num) {
  if (isNumeric(num)) {
    return Number(num);
  }

  return num;
}
