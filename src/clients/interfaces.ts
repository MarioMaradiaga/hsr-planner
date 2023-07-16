import {
  GetCharacterByNameResponse,
  GetCharactersResponse,
  GetTierListResponse,
} from "@/types/characters";

export abstract class ICharactersClient {
  abstract getCharacters(): Promise<GetCharactersResponse>;
  abstract getCharacterByName(
    name: string
  ): Promise<GetCharacterByNameResponse>;
}

export abstract class IWikiClient {
  abstract getTierList(): GetTierListResponse;
}
