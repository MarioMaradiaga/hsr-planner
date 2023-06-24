import {
  Character,
  GetTierListResponse,
  TierListRating,
} from "@/types/characters";
import tierListData from "@/data/tier-list.json";
import { IWikiClient } from "./interfaces";
import { tierListSchema } from "@/types/schemas";

const tierListRatingToSortingValueMap = {
  [TierListRating.S_PLUS]: 0,
  [TierListRating.S]: 1,
  [TierListRating.A]: 2,
  [TierListRating.B]: 3,
  [TierListRating.C]: 4,
  [TierListRating.D]: 5,
};

export class PrydwenWikiClient extends IWikiClient {
  getTierList(): GetTierListResponse {
    const data = tierListSchema.parse(tierListData);
    const tierToCharacterMap = new Map<TierListRating, Character[]>();
    for (const character of data.result.data.allCharacters.nodes) {
      if (character.ratings.story_late) {
        if (!tierToCharacterMap.has(character.ratings.story_late)) {
          tierToCharacterMap.set(character.ratings.story_late, [
            {
              name: character.name,
            },
          ]);
        } else {
          const tierCharacters = tierToCharacterMap.get(
            character.ratings.story_late
          );
          if (!tierCharacters) {
            throw new Error(
              `resolving array of characters for tier "${character.ratings.story_late}"`
            );
          }
          tierCharacters.push({
            name: character.name,
          });
        }
      }
    }
    return {
      tiers: Array.from(tierToCharacterMap.entries())
        .sort(
          ([a], [b]) =>
            tierListRatingToSortingValueMap[a] -
            tierListRatingToSortingValueMap[b]
        )
        .map(([tier, characters]) => ({
          rating: tier,
          characters,
        })),
    };
  }
}

export const wikiClient = new PrydwenWikiClient();
