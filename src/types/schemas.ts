import { TierListRating } from "@/types/characters";
import { z } from "zod";

const raritySchema = z.union([z.literal("4"), z.literal("5")]);

const elementSchema = z.union([
  z.literal("Fire"),
  z.literal("Ice"),
  z.literal("Imaginary"),
  z.literal("Lightning"),
  z.literal("Physical"),
  z.literal("Quantum"),
  z.literal("Wind"),
]);

const pathSchema = z.union([
  z.literal("Abundance"),
  z.literal("Destruction"),
  z.literal("Erudition"),
  z.literal("Harmony"),
  z.literal("Hunt"),
  z.literal("Nihility"),
  z.literal("Preservation"),
]);

const tierCategory = z.union([
  z.literal("DPS"),
  z.literal("Offensive Support"),
  z.literal("Support"),
]);

const ratingSchema = z
  .enum(["1", "5", "6", "7", "8", "9", "9.5"])
  .transform((value): TierListRating | null => {
    switch (value) {
      case "1":
        return null;
      case "5":
        return TierListRating.D;
      case "6":
        return TierListRating.C;
      case "7":
        return TierListRating.B;
      case "8":
        return TierListRating.A;
      case "9":
        return TierListRating.S;

      case "9.5":
        return TierListRating.S_PLUS;
    }
  });

const tierListChange = z.boolean().nullable();

export const tierListSchema = z.object({
  path: z.string(),
  result: z.object({
    data: z.object({
      allCharacters: z.object({
        nodes: z.array(
          z.object({
            id: z.string().uuid(),
            unitId: z.number(),
            slug: z.string(),
            name: z.string(),
            rarity: raritySchema,
            element: elementSchema,
            path: pathSchema,
            tierCategory: tierCategory,
            ratings: z.object({
              story_early: ratingSchema,
              story_late: ratingSchema,
              sim: ratingSchema,
              bosses: ratingSchema,
              farming: ratingSchema,
            }),
            tierListUp: tierListChange,
            tierListDown: tierListChange,
          })
        ),
      }),
    }),
  }),
});
