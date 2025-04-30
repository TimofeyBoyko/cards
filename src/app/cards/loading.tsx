import Card from "@/components/Card";

export default function Loading() {
  return Array.from({ length: 7 }, (_, index) => (
    <Card key={index} isSkeleton />
  ));
}
