import type { User } from "./user";

export interface LoginResponse {
  accessToken: string;
  expiresIn: number;
  user: User;
  message?: string;
}
