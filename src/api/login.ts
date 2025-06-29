import { API_BASE_URL, LOGIN_ENDPOINT } from "../constants/urls";
import type { LoginResponse } from "../types/loginResponse";

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}${LOGIN_ENDPOINT}`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  const data: LoginResponse = await response.json();
  return data;
};
