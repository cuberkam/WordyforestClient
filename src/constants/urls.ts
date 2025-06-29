export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Auth endpoints
export const LOGIN_ENDPOINT = "/auth/login";
export const REGISTER_ENDPOINT = "/auth/register";
export const LOGOUT_ENDPOINT = "/auth/logout";

//  Vocabulary endpoints
export const VOCABULARY_RANDOM_ENDPOINT = "/vocabulary/random";
export const REMOVE_VOCABULARY_ENDPOINT = "/vocabulary/remove";
export const SEARCH_WORD_ENDPOINT = "/vocabulary/search";
export const ADD_VOCABULAR_ENDPOINT = "/vocabulary/add";

// Vocabularies List endpoints
export const VOCABULARIES_LISTS_ENDPOINT = "/vocabularieslist";
export const PUBLIC_VOCABULARIES_LISTS_ENDPOINT = "/vocabularieslist/public";
export const USER_VOCABULARIES_LISTS_ENDPOINT = "/vocabularieslist/user";

// Subscribed List endpoints
export const USER_SUBSCRIBED_LISTS_ENDPOINT = "/subscribedlist/user";
export const SUBSCRIBED_LISTS_ENDPOINT = "/subscribedlist";
