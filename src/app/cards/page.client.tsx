"use client";

import { Card as CardType } from "@/api";
import Card from "@/components/Card";
import { useCards } from "@/context/cardsContext";
import { useEffect } from "react";

export default function PageClient({
  initialCards,
}: {
  initialCards: CardType[] | Error;
}) {
  const { cards, error, updateCards, isInit, setIsInit, isLoading } =
    useCards();

  useEffect(() => {
    if (isInit) return;

    setIsInit(true);
  }, [isInit, setIsInit]);

  if (isLoading) {
    return Array.from({ length: 7 }, (_, i) => (
      <Card key={`skeleton-${i}`} isSkeleton={true} />
    ));
  }

  if (initialCards instanceof Error || error) {
    return (
      <>
        <p className="w-full text-center py-10 text-gray-500">
          {error
            ? error.message
            : initialCards instanceof Error
            ? initialCards.message
            : "Unknown error"}
        </p>
        <button
          onClick={updateCards}
          className="border border-gray-300 rounded-md px-4 py-2 mt-4 h-12 cursor-pointer hover:border-gray-500 transition-colors"
        >
          Повторить
        </button>
      </>
    );
  }

  const currentCards = cards.length > 0 ? cards : initialCards;

  const visibleCards = currentCards.slice(0, 7);

  const skeletonCount = Math.max(0, 7 - visibleCards.length);

  const skeletons = Array.from({ length: skeletonCount }, (_, i) => (
    <Card key={`skeleton-${i}`} isSkeleton={true} />
  ));

  return (
    <>
      {visibleCards.map((card, index) => (
        <Card key={`${card.title}-${index}`} card={card} />
      ))}
      {skeletons}
    </>
  );
}
