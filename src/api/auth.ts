const BASE_URL = "https://www.pre-onboarding-selection-task.shop";
// const BASE_URL = "http://localhost:8000";

type RequestBodyType = {
  email: string;
  password: string;
};

export const signupAuth = async (body: RequestBodyType) => {
  const data = await (
    await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  ).json();

  if (data) {
    return { ok: false, error: "해당 이메일이 이미 존재합니다." };
  }
  return { ok: true, error: "" };
};

type ResponseSignin = {
  access_token: string;
};

export const signinAuth = async (body: RequestBodyType) => {
  const data: ResponseSignin = await (
    await fetch(`${BASE_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
  ).json();
  if (!data.access_token) {
    return { ok: false, token: null, error: "잘못된 로그인 정보입니다." };
  }
  return { ok: true, token: data.access_token };
};
