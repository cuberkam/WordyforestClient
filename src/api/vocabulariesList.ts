import type {
  VocabulariesList,
  VocabulariesLists,
} from "../types/vocabulariesList";
import {
  API_BASE_URL,
  PUBLIC_VOCABULARIES_LISTS_ENDPOINT,
  USER_VOCABULARIES_LISTS_ENDPOINT,
  USER_SUBSCRIBED_LISTS_ENDPOINT,
  VOCABULARIES_LISTS_ENDPOINT,
} from "../constants/urls";

export const fetchPublicVocabulariesLists =
  async (): Promise<VocabulariesLists> => {
    const response = await fetch(
      `${API_BASE_URL}${PUBLIC_VOCABULARIES_LISTS_ENDPOINT}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch vocabularies list");
    }
    return await response.json();
  };

export const fetchUserVocabulariesLists =
  async (): Promise<VocabulariesLists> => {
    const response = await fetch(
      `${API_BASE_URL}${USER_VOCABULARIES_LISTS_ENDPOINT}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user vocabularies list");
    }
    return await response.json();
  };

export const fetchSubscribedVocabulariesLists =
  async (): Promise<VocabulariesLists> => {
    const response = await fetch(
      `${API_BASE_URL}${USER_SUBSCRIBED_LISTS_ENDPOINT}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user subscribed vocabularies list");
    }
    return await response.json();
  };

export const createVocabulariesList = async (
  name: string
): Promise<VocabulariesList> => {
  const response = await fetch(
    `${API_BASE_URL}${VOCABULARIES_LISTS_ENDPOINT}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create vocabularies list");
  }

  return response.json();
};

export const deleteVocabulariesList = async (id: number): Promise<boolean> => {
  const response = await fetch(
    `${API_BASE_URL}${VOCABULARIES_LISTS_ENDPOINT}/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) {
    return false;
  }

  return true;
};

export const fetchVocabulariesListWithId = async (
  id: number
): Promise<VocabulariesList> => {
  const response = await fetch(
    `${API_BASE_URL}${VOCABULARIES_LISTS_ENDPOINT}/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch vocabularies list");
  }
  return await response.json();
};
