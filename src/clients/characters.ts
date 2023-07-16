import fs from "fs";
import path from "path";
import {
  EidolonLevel,
  GetCharacterByNameResponse,
  GetCharactersResponse,
  Rarity,
} from "@/types/characters";
import { ICharactersClient } from "./interfaces";
import { z } from "zod";
import hoyolabResponse from "@/data/hoyolab.json";

const elementSchema = z.union([
  z.literal("fire"),
  z.literal("ice"),
  z.literal("imaginary"),
  z.literal("lightning"),
  z.literal("physical"),
  z.literal("quantum"),
  z.literal("wind"),
]);

const raritySchema = z
  .union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)])
  .transform((value) => {
    switch (value) {
      case 1:
        return Rarity.R1;
      case 2:
        return Rarity.R2;
      case 3:
        return Rarity.R3;
      case 4:
        return Rarity.R4;
      case 5:
        return Rarity.R5;
      default:
        throw new Error(
          `transforming rarity form unexpected value: "${value}"`
        );
    }
  });

const rankSchema = z
  .union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
  ])
  .transform((value) => {
    switch (value) {
      case 0:
        return EidolonLevel.E0;
      case 1:
        return EidolonLevel.E1;
      case 2:
        return EidolonLevel.E2;
      case 3:
        return EidolonLevel.E3;
      case 4:
        return EidolonLevel.E4;
      case 5:
        return EidolonLevel.E5;
      case 6:
        return EidolonLevel.E6;
      default:
        throw new Error(
          `transforming rarity form unexpected value: "${value}"`
        );
    }
  });

export const hoyolabResponseSchema = z.object({
  data: z.object({
    avatar_list: z.array(
      z.object({
        id: z.number(),
        level: z.number(),
        name: z.string(),
        element: elementSchema,
        icon: z.string(),
        rarity: raritySchema,
        rank: rankSchema,
        image: z.string(),
        equip: z.nullable(
          z.object({
            id: z.number(),
            level: z.number(),
            rank: z.number(),
            name: z.string(),
            desc: z.string(),
            icon: z.string(),
          })
        ),
        relics: z.array(
          z.object({
            id: z.number(),
            level: z.number(),
            pos: z.number(),
            name: z.string(),
            desc: z.string(),
            icon: z.string(),
            rarity: z.number(),
          })
        ),
        ranks: z.array(
          z.object({
            id: z.number(),
            pos: z.number(),
            name: z.string(),
            desc: z.string(),
            icon: z.string(),
            is_unlocked: z.boolean(),
          })
        ),
      })
    ),
  }),
});

export class HoyolabCharactersClient extends ICharactersClient {
  private async fetchMasterData(): Promise<
    z.infer<typeof hoyolabResponseSchema>
  > {
    return hoyolabResponseSchema.parse(hoyolabResponse);
  }

  async getCharacters(): Promise<GetCharactersResponse> {
    const data = await this.fetchMasterData();

    return {
      characters: data.data.avatar_list,
    };
  }

  async getCharacterByName(name: string): Promise<GetCharacterByNameResponse> {
    const data = await this.fetchMasterData();

    const character = data.data.avatar_list.find(
      (c) => c.name.replaceAll(" ", "-").toLowerCase() === name
    );

    if (!character) {
      throw new Error(`finding character with name "${name}"`);
    }

    return {
      character,
    };
  }
}

export const charactersClient = new HoyolabCharactersClient();
