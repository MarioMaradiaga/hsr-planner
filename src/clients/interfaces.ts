import { GetCharactersResponse, GetTierListResponse } from "@/types/characters";

export abstract class ICharactersClient {
  abstract getCharacters(): Promise<GetCharactersResponse>;
}

export abstract class IWikiClient {
  abstract getTierList(): GetTierListResponse;
}
