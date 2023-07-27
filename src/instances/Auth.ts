import { HttpClient } from "./HttpClient";
import { TokenStorage } from "./TokenStorage";

export class Auth {
  protected readonly httpClient;
  protected readonly tokenStorage;

  constructor(httpClient: HttpClient, tokenStorage: TokenStorage) {
    this.httpClient = httpClient;
    this.tokenStorage = tokenStorage;
  }

  async signin(body: RequestBodyType) {
    try {
      const { access_token }: ResponseSignin = await (
        await this.httpClient.fetch(`/auth/signin`, {
          method: "POST",
          body: JSON.stringify(body),
        })
      ).json();

      this.tokenStorage.save(access_token);
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }

  async signup(body: RequestBodyType) {
    try {
      await (
        await this.httpClient.fetch(`/auth/signup`, {
          method: "POST",
          body: JSON.stringify(body),
        })
      ).json();
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }
}

type RequestBodyType = {
  email: string;
  password: string;
};

type ResponseSignin = {
  access_token: string;
};
