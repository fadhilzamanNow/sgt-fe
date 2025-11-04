export function debounce(fn: (value: string) => void) {
  let timerId: NodeJS.Timeout;

  return (value: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(value), 300);
  };
}
