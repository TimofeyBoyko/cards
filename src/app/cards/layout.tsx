export default function CardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[200px] md:w-[416px] mx-auto ">
        {children}
      </div>
    </div>
  );
}
