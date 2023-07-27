import { LocalStorage } from "./LocalStorage";

export class TokenStorage {
  public readonly TOKEN_KEY = "wtd-token";
  private readonly localStorage;
  private readonly EXPIRY_TIME = 1000 * 60 * 60 * 24 * 7;
  constructor(localStorage: LocalStorage) {
    this.localStorage = localStorage;
  }

  save<T>(value: T) {
    const savedAt = new Date().getTime();
    this.localStorage.set(this.TOKEN_KEY, {
      value,
      expiry_time: savedAt + this.EXPIRY_TIME,
    });
  }

  get() {
    return this.localStorage.get(this.TOKEN_KEY);
  }

  remove() {
    this.localStorage.remove(this.TOKEN_KEY);
  }

  initializedToken() {
    const tokenExpiryTime: number = JSON.parse(
      JSON.stringify(this.localStorage.get(this.TOKEN_KEY))
    ).expiry_time;
    if (tokenExpiryTime <= Date.now()) {
      this.localStorage.remove(this.TOKEN_KEY);
    }
  }
}
