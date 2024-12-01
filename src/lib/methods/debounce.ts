type DebouncedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => void;

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): DebouncedFunction<T> {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function (this: void, ...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) {
        func(...args); // Call without a `this` context
      }
    };

    const callNow = immediate && !timeout;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(later, wait);

    if (callNow) {
      func(...args); // Call without a `this` context
    }
  };
}

export default debounce;