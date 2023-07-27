import { TokenStorage } from "./TokenStorage";

export class HttpClient {
  private readonly BASE_URL = "https://www.pre-onboarding-selection-task.shop/";
  private readonly ACCESS_TOKEN;
  private pathname: string;
  constructor(pathname: string, tokenStorage: TokenStorage) {
    this.pathname = pathname;
    this.ACCESS_TOKEN = tokenStorage.get();
  }
  fetch(url: string, options?: RequestInit) {
    return window.fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.ACCESS_TOKEN}`,
        ...options?.headers,
      },
    });
  }
}
