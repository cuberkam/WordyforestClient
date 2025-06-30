import type { Vocabulary } from "../types/vocabulary";
import {
  VOCABULARY_ENDPOINT,
  API_BASE_URL,
  SEARCH_WORD_ENDPOINT,
  VOCABULARY_RANDOM_ENDPOINT,
} from "../constants/urls";
import type { searchResponse } from "../types/searchResponse";

export const fetchVocabularyRandom = async (
  vocabulariesListId: number
): Promise<Vocabulary> => {
  let url = `${API_BASE_URL}${VOCABULARY_RANDOM_ENDPOINT}`;
  if (vocabulariesListId && vocabulariesListId !== 0)
    url += `?vlId=${vocabulariesListId}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch vocabulary random");
  } else if (response.status === 204) {
    return {} as Vocabulary;
  }

  return await response.json();
};

export const removeVocabularyInVocabulariesList = async (
  vocabulariesListId: number,
  vocabularyId: number
): Promise<boolean> => {
  const response = await fetch(`${API_BASE_URL}${VOCABULARY_ENDPOINT}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      VocabulariesListId: vocabulariesListId,
      VocabularyId: vocabularyId,
    }),
  });
  if (!response.ok) {
    return false;
  }
  return true;
};

export const searchWord = async (
  word: string,
  vocabulariesListId: number
): Promise<searchResponse> => {
  const response = await fetch(
    `${API_BASE_URL}${SEARCH_WORD_ENDPOINT}?word=${word}&vlId=${vocabulariesListId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return response.json();
};

export const addVocabulary = async (
  vocabulariesListId: number,
  vocabularyId: number
): Promise<Vocabulary | null> => {
  const response = await fetch(`${API_BASE_URL}${VOCABULARY_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      VocabulariesListId: vocabulariesListId,
      VocabularyId: vocabularyId,
    }),
  });

  if (!response.ok) return null;

  return response.json();
};
