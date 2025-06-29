import { API_BASE_URL, LOGOUT_ENDPOINT } from "../constants/urls";

export const logout = async (): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}${LOGOUT_ENDPOINT}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }
};
