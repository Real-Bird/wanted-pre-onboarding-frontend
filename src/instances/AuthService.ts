import { HttpClient } from "./HttpClient";
import { TokenStorage } from "./TokenStorage";

export class AuthService {
  protected readonly httpClient;
  protected readonly tokenStorage;

  constructor(httpClient: HttpClient, tokenStorage: TokenStorage) {
    this.httpClient = httpClient;
    this.tokenStorage = tokenStorage;
  }

  async signup(body: RequestBodyType) {
    const data = await this.httpClient.fetch(`auth/signup`, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (data.status !== 201) {
      const res: ResponseSignup = await data.json();
      return {
        ok: false,
        message: res.message,
      };
    }
    return { ok: true, message: "성공적으로 계정을 생성했습니다!" };
  }

  async signin(body: RequestBodyType) {
    try {
      const { access_token }: ResponseSignin = await (
        await this.httpClient.fetch(`auth/signin`, {
          method: "POST",
          body: JSON.stringify(body),
        })
      ).json();

      this.tokenStorage.save(access_token);
      return { ok: true, message: "성공적으로 로그인했습니다!" };
    } catch (e) {
      const error = e as Error;
      throw { ok: false, message: error.message };
    }
  }
}

type RequestBodyType = {
  email: string;
  password: string;
};

export type ResponseSignup = {
  error: string;
  message: string;
  statusCode: number;
};

export type ResponseSignin = {
  access_token: string;
};
