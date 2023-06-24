import { charactersClient } from "@/clients";
import { CharacterPortrait } from "@/components/character-portrait";

export const metadata = {
  title: "Tier List",
};

export default async function TierList() {
  const data = await charactersClient.getCharacters();
  return (
    <div className="grid gap-4 grid-cols-3 h-full">
      <div className="grid gap-4 grid-cols-3">
        {data.characters.map((c) => (
          <div key={c.id}>
            <CharacterPortrait name={c.name} icon={c.icon} />
          </div>
        ))}
      </div>
      <div className="col-span-2">Character section</div>
    </div>
  );
}
