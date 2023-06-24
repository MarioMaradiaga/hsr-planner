import { wikiClient } from "@/clients/wiki";
import { TierListRating } from "@/types/characters";
import Image from "next/image";

export const metadata = {
  title: "Tier List",
};

const tierToColorMap = {
  [TierListRating.S_PLUS]: "bg-red-700",
  [TierListRating.S]: "bg-pink-700",
  [TierListRating.A]: "bg-orange-600",
  [TierListRating.B]: "bg-yellow-500",
  [TierListRating.C]: "bg-green-700",
  [TierListRating.D]: "bg-blue-700",
};

const CharacterPortrait = ({ name }: { name: string }) => {
  return (
    <div className="w-10">
      <Image
        className="w-full"
        src="/arlan-portrait.webp"
        alt={"Arlan"}
        width="50"
        height="50"
      />

      <div
        key={name}
        className="w-20 text-gray-400 dark:text-gray-500 text-center"
      >
        {name}
      </div>
    </div>
  );
};

export default async function TierList() {
  const data = await wikiClient.getTierList();
  return (
    <div className="grid gap-4">
      {data.tiers.map((tier) => (
        <div key={tier.rating} className="grid-cols-1">
          <div className="flex rounded bg-gray-50 dark:bg-gray-800 overflow-hidden">
            <div
              className={`flex flex-col justify-center w-12 p-2 text-center ${
                tier.rating ? tierToColorMap[tier.rating] : ""
              }`}
            >
              <p className="text-2xl">{tier.rating}</p>
            </div>
            <div className="flex flex-wrap flex-row items-top p-4">
              {tier.characters.map((t) => (
                <CharacterPortrait key={t.name} name={t.name} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
