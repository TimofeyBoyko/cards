"use client";

import { useCards } from "@/context/cardsContext";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const { cards, updateCards, isInit } = useCards();

  const [isDisabled, setIsDisabled] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (cards.length) {
      setIsDisabled(true);
      timerRef.current = setTimeout(() => {
        setIsDisabled(false);
      }, 3000);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [cards]);

  return (
    <header className="flex items-center justify-center gap-4 h-12 bg-gray-100">
      <h1>Карточки</h1>
      <button
        disabled={isDisabled || !isInit}
        onClick={updateCards}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-400 disabled:hover:bg-blue-400"
      >
        Обновить
      </button>
    </header>
  );
};

export default Header;
