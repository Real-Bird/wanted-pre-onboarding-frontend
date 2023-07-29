const BASE_URL = "https://www.pre-onboarding-selection-task.shop";
const TOKEN_KEY = "wtd-token";

export interface ResponseToDoType {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export const createTodo = async (todo: string) => {
  const { value: token }: { value: string; expiry_time: number } = JSON.parse(
    JSON.stringify(localStorage.getItem(TOKEN_KEY))
  );
  await (
    await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo }),
    })
  ).json();
  return { ok: true };
};

export const getTodos = async () => {
  const { value: token }: { value: string; expiry_time: number } = JSON.parse(
    localStorage.getItem(TOKEN_KEY) as string
  );
  const data: ResponseToDoType[] = await (
    await fetch(`${BASE_URL}/todos`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  ).json();
  return { ok: true, todos: data };
};

export const updateTodo = async (body: Partial<ResponseToDoType>) => {
  const { value: token }: { value: string; expiry_time: number } = JSON.parse(
    JSON.stringify(localStorage.getItem(TOKEN_KEY))
  );
  const data = await (
    await fetch(`${BASE_URL}/todos/${body.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ todo: body.todo, isCompleted: body.isCompleted }),
    })
  ).json();

  return { ok: true };
};

export const deleteTodo = async (id: number) => {
  const { value: token }: { value: string; expiry_time: number } = JSON.parse(
    JSON.stringify(localStorage.getItem(TOKEN_KEY))
  );
  await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return { ok: true };
};
