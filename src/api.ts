type Card = {
  title: string;
  text: string;
};

type CardsResponse = {
  cards: Card[];
};

const getCards = async (signal?: AbortSignal): Promise<Card[] | Error> => {
  try {
    const response = await fetch(
      "https://node-test-server-production.up.railway.app/api/cards",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store", // Disable caching to always fetch fresh data
        signal, // Pass the abort signal to allow cancellation
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching cards: ${response.status}`);
    }

    const data = (await response.json()) as CardsResponse;

    const cards = data.cards || [];

    // Sort cards by title alphabetically, and then by text length if titles are the same
    // Empty titles should appear at the end of the list
    return cards.sort((a, b) => {
      // Handle empty titles - move them to the end
      if (!a.title.trim() && b.title.trim()) return 1; // a has empty title, move to end
      if (a.title.trim() && !b.title.trim()) return -1; // b has empty title, move to end

      // If both titles are empty or both have values, sort alphabetically
      const titleCompare = a.title.localeCompare(b.title);

      // If titles are the same, sort by text length (shorter first)
      if (titleCompare === 0) {
        return a.text.length - b.text.length;
      }

      return titleCompare;
    });
  } catch (error) {
    if (error instanceof Error && error.name !== "AbortError") {
      console.error("Failed to fetch cards:", error);
    }
    return error as Error;
  }
};

export { getCards, type Card };
