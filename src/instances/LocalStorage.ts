export class LocalStorage {
  get(key: string) {
    return localStorage.getItem(key);
  }

  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
