import ProductDetail from "@/app/(public)/components/ProductDetail";

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="max-w-7xl mx-auto">
      <ProductDetail productId={params.id} />
    </div>
  );
}
