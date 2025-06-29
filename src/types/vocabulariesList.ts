import type { Vocabulary } from "./vocabulary.ts";

export interface VocabulariesList {
  id: number;
  name: string;
  createdDate: string;
  shareId: string;
  vocabularies: {
    $values: Vocabulary[];
  };
}

export interface VocabulariesLists {
  $values: VocabulariesList[];
}
