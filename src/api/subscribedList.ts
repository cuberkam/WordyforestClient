import { API_BASE_URL, SUBSCRIBED_LISTS_ENDPOINT } from "../constants/urls";
import type { SubscribedList } from "../types/subscribedList";

export const subscribeToVocabularyList = async (
  shareId: string
): Promise<SubscribedList | null> => {
  const response = await fetch(`${API_BASE_URL}${SUBSCRIBED_LISTS_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ shareId }),
  });

  if (!response.ok) {
    return null;
  }

  return response.json();
};

export const unsubscribeFromVocabularyList = async (
  id: number
): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}${SUBSCRIBED_LISTS_ENDPOINT}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ vocabulariesListId: id }),
  });

  if (!response.ok) {
    return false;
  }

  return true;
};
