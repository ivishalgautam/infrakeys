export function removeEmptyKeys(obj) {
  for (let key in obj) {
    if (!obj[key].length) {
      delete obj[key];
    }
  }
  return obj;
}
