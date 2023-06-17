export enum TierListRating {
  S_PLUS = "S+",
  S = "S",
  A = "A",
  B = "B",
  C = "C",
  D = "D",
}

export type Character = {
  name: string;
};

export type TierList = {
  tiers: {
    rating: TierListRating | null;
    characters: Character[];
  }[];
};
