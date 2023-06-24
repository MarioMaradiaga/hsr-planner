import Image from "next/image";

export const CharacterPortrait = ({
  name,
  icon,
}: {
  name: string;
  icon?: string;
}) => {
  return (
    <div>
      <Image
        className="w-full"
        src={icon ?? "/arlan-portrait.webp"}
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
