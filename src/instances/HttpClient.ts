import { TokenStorage } from "./TokenStorage";

export class HttpClient {
  // private readonly BASE_URL = "https://www.pre-onboarding-selection-task.shop/";
  private readonly BASE_URL = "http://localhost:8000/";
  private readonly ACCESS_TOKEN;
  constructor(tokenStorage: TokenStorage) {
    this.ACCESS_TOKEN = tokenStorage.get();
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
