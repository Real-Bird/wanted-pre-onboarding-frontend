import { HttpClient } from "./HttpClient";

export class ToDoService {
  private readonly httpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  async createTodo(todo: string) {
    try {
      const newToDoData = (await (
        await this.httpClient.fetch("todos", {
          method: "POST",
          body: JSON.stringify({ todo }),
        })
      ).json()) as ResponseToDoType;
      return { ok: true, newToDoData };
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }

  async getTodos() {
    try {
      const todosData = (await (
        await this.httpClient.fetch("todos", {
          method: "GET",
        })
      ).json()) as ResponseToDoType[];
      return { ok: true, todos: todosData };
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }

  async updateTodo(
    body: Pick<ResponseToDoType, "id" | "todo" | "isCompleted">
  ) {
    try {
      const updateTodoData = (await (
        await this.httpClient.fetch(`todos/${body.id}`, {
          method: "PUT",
          body: JSON.stringify({
            todo: body.todo,
            isCompleted: body.isCompleted,
          }),
        })
      ).json()) as ResponseToDoType;
      return { ok: true, updateTodo: updateTodoData };
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }

  async deleteTodo(id: number) {
    try {
      await this.httpClient.fetch(`todos/${id}`, {
        method: "DELETE",
      });
      return { ok: true, id };
    } catch (e) {
      const error = e as Error;
      throw new Error(error.message);
    }
  }
}

export interface ResponseToDoType {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}
