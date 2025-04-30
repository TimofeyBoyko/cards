"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { type Card, getCards } from "@/api";

type CardsContextType = {
  cards: Card[];
  error: Error | null;
  isInit: boolean;
  setIsInit: (value: boolean) => void;
  isLoading: boolean;
  updateCards: () => Promise<void>;
};

const CardsContext = createContext<CardsContextType | null>(null);

export const CardsProvider = ({ children }: { children: React.ReactNode }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isInit, setIsInit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Cleanup function to abort any in-flight requests when component unmounts
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const updateCards = useCallback(async () => {
    // Abort any existing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create a new AbortController
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      setIsLoading(true);
      const newCards = await getCards(signal);

      if (newCards instanceof Error) {
        if (newCards.name !== "AbortError") {
          console.error("Failed to fetch cards:", newCards);
          setError(newCards);
          setCards([]);
        }

        return;
      }

      setCards(newCards);
      setError(null);
    } catch (err) {
      if (err instanceof Error && err.name !== "AbortError") {
        console.error("Error fetching cards:", err);
        setError(err as Error);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <CardsContext.Provider
      value={{ cards, error, isInit, setIsInit, isLoading, updateCards }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export const useCards = () => {
  const context = useContext(CardsContext);
  if (!context) {
    throw new Error("useCards must be used within a CardsProvider");
  }
  return context;
};

export default CardsContext;
