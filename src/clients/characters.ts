import {
  EidolonLevel,
  GetCharactersResponse,
  Rarity,
} from "@/types/characters";
import { ICharactersClient } from "./interfaces";
import { z } from "zod";

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

export const hoyoLabResponseSchema = z.object({
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

export class HoyoLabCharactersClient extends ICharactersClient {
  private async fetchMasterData(): Promise<
    z.infer<typeof hoyoLabResponseSchema>
  > {
    const hoyoLabResponse = await fetch(
      "https://bbs-api-os.hoyolab.com/game_record/hkrpg/api/avatar/info?server=prod_official_asia&role_id=801856555",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
          ds: "1687605843,EG6jAW,36befb1801efd7f23a0cbcd6c1693b13",
          "x-rpc-app_version": "1.5.0",
          "x-rpc-client_type": "5",
          "x-rpc-language": "en-us",
          cookie: `ltoken=${process.env.HOYOLAB_TOKEN}; ltuid=${process.env.HOYOLAB_ACCOUNT_ID};`,
        },
        referrer: "https://act.hoyolab.com/",
        referrerPolicy: "strict-origin-when-cross-origin",
        body: null,
        method: "GET",
        mode: "cors",
        credentials: "include",
      }
    );
    if (!hoyoLabResponse.ok) {
      throw new Error(`fetching Hoyo Lab data`);
    }
    const jsonResponse = await hoyoLabResponse.json();
    return hoyoLabResponseSchema.parse(jsonResponse);
  }

  async getCharacters(): Promise<GetCharactersResponse> {
    const data = await this.fetchMasterData();

    return {
      characters: data.data.avatar_list,
    };
  }
}

export const charactersClient = new HoyoLabCharactersClient();
