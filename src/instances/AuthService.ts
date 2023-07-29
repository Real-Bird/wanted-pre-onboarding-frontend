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
      const res: ResponseError = await data.json();
      return {
        ok: false,
        message: res.message,
      };
    }
    return { ok: true, message: "성공적으로 계정을 생성했습니다!" };
  }

  async signin(body: RequestBodyType) {
    const data: ResponseSignin = await (
      await this.httpClient.fetch(`auth/signin`, {
        method: "POST",
        body: JSON.stringify(body),
      })
    ).json();

    switch (data.statusCode) {
      case 404: {
        return { ok: false, message: data.message };
      }
      case 401: {
        return { ok: false, message: "잘못된 사용자 정보입니다." };
      }
      default: {
        this.tokenStorage.save(data.access_token);
        return { ok: true, message: "성공적으로 로그인했습니다!" };
      }
    }
  }
}

type RequestBodyType = {
  email: string;
  password: string;
};

type ResponseError = {
  error?: string;
  message: string;
  statusCode: number;
};

export type ResponseSignin = {
  access_token: string;
} & ResponseError;
