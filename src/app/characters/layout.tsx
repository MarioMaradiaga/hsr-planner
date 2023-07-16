import { charactersClient } from "@/clients";
import { CharacterPortrait } from "@/components/character-portrait";
import { ReactNode } from "react";

export const metadata = {
  title: "Characters",
};

export default async function Characters({
  children,
}: {
  children: ReactNode;
}) {
  const data = await charactersClient.getCharacters();
  return (
    <div className="grid gap-4 grid-cols-3 h-full">
      <div className="grid gap-4 grid-cols-3 overflow-y-scroll">
        {data.characters.map((c) => (
          <div key={c.id}>
            <CharacterPortrait name={c.name} icon={c.icon} rarity={c.rarity} />
          </div>
        ))}
      </div>
      <div className="col-span-2 border-l border-solid border-gray-700 px-4">
        {children}
      </div>
    </div>
  );
}
