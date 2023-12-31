import { TokenStorage } from "./TokenStorage";

export class HttpClient {
  private readonly BASE_URL =
    "https://www.pre-onboarding-selection-task.store/";
  private readonly tokenStorage;
  constructor(tokenStorage: TokenStorage) {
    this.tokenStorage = tokenStorage;
  }

  fetch(pathname: string, options?: RequestInit) {
    const access_token = JSON.parse(
      this.tokenStorage.get() as string
    ) as AccessTokenType;

    return window.fetch(`${this.BASE_URL}${pathname}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token?.value}`,
        ...options?.headers,
      },
    });
  }
}

type AccessTokenType = { value: string; expiry_time: number };
