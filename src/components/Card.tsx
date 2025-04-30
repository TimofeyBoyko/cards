import type { Card as CardType } from "@/api";

type CardProps =
  | {
      card: CardType;
      isSkeleton?: never;
    }
  | {
      isSkeleton: true;
      card?: never;
    };

const Card = ({ card, isSkeleton }: CardProps) => {
  return (
    <div
      className={`w-[200px] h-[200px] border border-gray-300 rounded-md p-4 flex flex-col overflow-hidden ${
        isSkeleton ? "bg-gray-100" : "bg-transparent"
      }`}
    >
      {isSkeleton ? null : (
        <>
          <h2 className="text-lg font-semibold mb-2 truncate">{card.title}</h2>
          <p className="text-gray-600 overflow-hidden line-clamp-6">
            {card.text}
          </p>
        </>
      )}
    </div>
  );
};

export default Card;
