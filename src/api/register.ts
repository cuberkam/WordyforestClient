import { API_BASE_URL, REGISTER_ENDPOINT } from "../constants/urls";

export const register = async (
  email: string,
  password: string
): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}${REGISTER_ENDPOINT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email, password: password }),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }
};
