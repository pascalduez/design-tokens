export const isPlainObject = val =>
  Object.prototype.toString.call(val) === '[object Object]';
