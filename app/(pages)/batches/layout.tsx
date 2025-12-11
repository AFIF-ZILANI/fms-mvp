import FAB from "./FAB";

export default function BatchesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen">
      {children}
      <FAB />
    </div>
  );
}
