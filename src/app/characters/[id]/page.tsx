import { charactersClient } from "@/clients";
import { Metadata } from "next";

export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  return {
    title: params.id,
  };
}

export default async function CharacterPage({
  params,
}: {
  params: { id: string };
}) {
  const { character } = await charactersClient.getCharacterByName(params.id);

  return (
    <div>
      <div>{character.name}</div>
      <div>{character.rarity}</div>
      <div>{character.icon}</div>
    </div>
  );
}
