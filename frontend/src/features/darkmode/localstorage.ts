export function getItem<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);
    if (value === null) return null;
    return JSON.parse(value);
  } catch (error) {
    return null;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
}
