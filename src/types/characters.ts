export enum Rarity {
  "R1" = "R1",
  "R2" = "R2",
  "R3" = "R3",
  "R4" = "R4",
  "R5" = "R5",
}

export enum EidolonLevel {
  "E0" = "E0",
  "E1" = "E1",
  "E2" = "E2",
  "E3" = "E3",
  "E4" = "E4",
  "E5" = "E5",
  "E6" = "E6",
}

export enum TierListRating {
  S_PLUS = "S+",
  S = "S",
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

type ID = number;

export type Character = {
  id: ID;
  name: string;
  icon: string;
  rarity: Rarity;
};

export type GetTierListResponse = {
  tiers: {
    rating: TierListRating | null;
    characters: Character[];
  }[];
};

export type GetCharactersResponse = {
  characters: Character[];
};
export type GetCharacterByNameResponse = {
  character: Character;
};
