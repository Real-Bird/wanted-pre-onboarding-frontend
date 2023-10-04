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
    const alreadyToken = this.localStorage.get(this.TOKEN_KEY);
    if (!alreadyToken?.includes("expiry_time")) {
      this.localStorage.remove(this.TOKEN_KEY);
      return;
    }
    const token = JSON.parse(alreadyToken) as TokenType;
    if (!token) {
      return;
    }
    if (!token.expiry_time || token.expiry_time <= Date.now()) {
      this.localStorage.remove(this.TOKEN_KEY);
    }
  }
}

type TokenType = {
  value: string;
  expiry_time: number;
};
