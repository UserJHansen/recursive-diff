export const instanceOf = (instance) => (x) => x instanceof instance;

export const isNumber = (x) => typeof x === 'number';
export const isBoolean = (x) => typeof x === 'boolean';
export const isString = (x) => typeof x === 'string';
export const isDate = instanceOf(Date);
export const isUndefined = (x) => typeof x === 'undefined';
export const isNull = (x) => x === null;
export const isArray = instanceOf(Array);
export const isMap = instanceOf(Map);
export const isSet = instanceOf(Set);
export const isIterableObject = (x) => {
  const type = Object.prototype.toString.call(x);
  return type === '[object Object]';
};
export const noop = () => {};

export const areDatesEqual = (dt1, dt2) => dt1.getTime() === dt2.getTime();

export function setValueByPath(x, path = [], value, visitorCallback) {
  if (!(isArray(path))) {
    throw new Error(`Diff path: "${path}" is not valid`);
  }
  const { length } = path;
  if (length === 0) {
    return value;
  }
  let val = x;
  for (let i = 0; i < length; i += 1) {
    const key = path[i];
    if (!val) throw new Error(`Invalid path: "${path}" for object: ${JSON.stringify(x, null, 2)}`);
    else if (key == null) throw new Error(`Invalid path: "${path}" for object: ${JSON.stringify(x, null, 2)}`);

    if (i !== length - 1) {
      val = val[key];
      if (visitorCallback) {
        visitorCallback(val);
      }
    } else {
      val[key] = value;
    }
  }
  return x;
}

export function deleteValueByPath(ob, path) {
  const keys = path || [];
  if (keys.length === 0) {
    return undefined;
  }
  let val = ob;
  const { length } = keys;
  for (let i = 0; i < length; i += 1) {
    if (i !== length - 1) {
      if (!val[keys[i]]) {
        throw new Error(`Invalid path: "${path}" for object: ${JSON.stringify(ob, null, 2)}`);
      }
      val = val[keys[i]];
    } else if (isIterableObject(val)) {
      delete val[keys[i]];
    } else {
      const index = parseInt(keys[i], 10);
      while (val.length > index) {
        val.pop();
      }
    }
  }
  return ob;
}

const utils = {
  isNumber,
  isBoolean,
  isString,
  isDate,
  isUndefined,
  isNull,
  isArray,
  isMap,
  isSet,
  isIterableObject,
  noop,
  areDatesEqual,
  setValueByPath,
  deleteValueByPath,
}

export default utils;
