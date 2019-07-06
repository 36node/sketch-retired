function isNumeric(num) {
  return !isNaN(num);
}

function safeToNumber(num) {
  if (isNumeric(num)) {
    return Number(num);
  }

  return num;
}

function safeToArray(field) {
  if (typeof field === "string") {
    return [field];
  }

  return field;
}

module.exports = {
  isNumeric,
  safeToNumber,
  safeToArray,
};
