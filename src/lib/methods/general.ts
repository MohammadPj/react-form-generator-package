export const result = <T extends object, K extends keyof T> (
  object: T,
  key: K,
  defaultValue?: T[K] | (() => T[K])
): T[K] => {
  const value = object[key];

  if (value === undefined && defaultValue !== undefined) {
    return typeof defaultValue === "function"
      ? (defaultValue as () => T[K])()
      : defaultValue;
  }

  return typeof value === "function" ? value.call(object) : value;
}

export const deepMerge = <T extends object>(...objects: (T | undefined)[]): T => {
  const result: any = {};

  for (const obj of objects) {
    if (!obj) continue; // Skip undefined or null objects
    for (const key in obj) {
      if (
        obj[key] &&
        typeof obj[key] === "object" &&
        !Array.isArray(obj[key]) &&
        result[key] &&
        typeof result[key] === "object" &&
        !Array.isArray(result[key])
      ) {
        // Recursively merge objects
        result[key] = deepMerge(result[key], obj[key]);
      } else {
        // Otherwise, add or overwrite the property
        result[key] = obj[key];
      }
    }
  }

  return result;
};