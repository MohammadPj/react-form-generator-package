export function result<T extends object, K extends keyof T>(
  object: T,
  key: K,
  defaultValue?: T[K] | (() => T[K])
): T[K] {
  const value = object[key];

  if (value === undefined && defaultValue !== undefined) {
    return typeof defaultValue === "function"
      ? (defaultValue as () => T[K])()
      : defaultValue;
  }

  return typeof value === "function" ? value.call(object) : value;
}

export default result;