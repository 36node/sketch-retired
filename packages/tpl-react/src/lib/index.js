function isEmptyObject(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function clean(obj) {
  if (Array.isArray(obj)) return obj;
  const newObj = { ...obj };
  var propNames = Object.getOwnPropertyNames(newObj);
  for (var i = 0; i < propNames.length; i++) {
    var propName = propNames[i];
    if (newObj[propName] && typeof newObj[propName] === "object") {
      newObj[propName] = clean(newObj[propName]);
    }
    if (
      newObj[propName] === null ||
      newObj[propName] === undefined ||
      isEmptyObject(newObj[propName])
    ) {
      delete newObj[propName];
    }
  }
  return newObj;
}
