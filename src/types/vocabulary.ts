import type { Synonym } from "./synonym.ts";

export interface Vocabulary {
  id: number;
  word: string;
  type: string;
  description: string;
  example: string;
  synonyms: {
    $values: Synonym[];
  };
}
