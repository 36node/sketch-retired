export function isNumeric(num) {
  return !isNaN(num);
}

export function safeToNumber(num) {
  if (isNumeric(num)) {
    return Number(num);
  }

  return num;
}

export function safeToArray(arrOrStr) {
  if (Array.isArray(arrOrStr)) {
    return arrOrStr;
  }

  return [arrOrStr];
}
