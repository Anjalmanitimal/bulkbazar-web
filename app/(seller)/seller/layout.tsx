import SellerSidebar from "./_components/SellerSidebar";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <SellerSidebar />

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
