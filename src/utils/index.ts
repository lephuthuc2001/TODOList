export function storeOnLocalStorage(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function getItemFromLocalStorage(key: string) {
  return localStorage.getItem(key);
}
