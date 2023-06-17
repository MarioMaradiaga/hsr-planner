import { TierList } from "@/types/characters";

export abstract class ICharactersClient {
  abstract getTierList(): TierList;
}
