import { TokenStorage } from "./TokenStorage";

export class HttpClient {
  private readonly BASE_URL = "https://www.pre-onboarding-selection-task.shop/";
  private readonly ACCESS_TOKEN;
  constructor(tokenStorage: TokenStorage) {
    this.ACCESS_TOKEN = JSON.parse(tokenStorage.get() ?? "").value;
  }
  fetch(pathname: string, options?: RequestInit) {
    return window.fetch(`${this.BASE_URL}${pathname}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
        ...options?.headers,
      },
    });
  }
}
