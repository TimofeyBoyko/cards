import { getCards } from "@/api";

import PageClient from "./page.client";

export default async function Page() {
  const cards = await getCards();

  return <PageClient initialCards={cards} />;
}
