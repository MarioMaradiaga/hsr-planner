import { Rarity } from "@/types/characters";
import Image from "next/image";

const getGradientForRarity = (rarity: Rarity) => {
  switch (rarity) {
    case Rarity.R4:
      return "linear-gradient(180deg,#343659,#8a5fcc 53%)";
    case Rarity.R5:
      return "linear-gradient(180deg,#885550,#c9a36a 53%)";
    default:
      throw new Error(`resolving linear gradient for rarity "${rarity}"`);
  }
};

export const CharacterPortrait = ({
  name,
  icon,
  rarity,
}: {
  name: string;
  icon: string;
  rarity: Rarity;
}) => {
  const characterRoute = `/characters/${name
    .replaceAll(" ", "-")
    .toLowerCase()}`;
  return (
    <div
      className="pb-0.5"
      style={{
        background: getGradientForRarity(rarity),
      }}
    >
      <a href={characterRoute}>
        <Image
          className="w-full"
          src={icon ?? "/arlan-portrait.webp"}
          alt={"Arlan"}
          width="50"
          height="50"
        />

        <div
          key={name}
          className="text-gray-400 dark:text-gray-300 text-center bg-black"
        >
          {name}
        </div>
      </a>
    </div>
  );
};
