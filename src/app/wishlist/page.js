// src/app/wishlist/page.js
import { buildMetadata } from "@/utils/seo";

export const metadata = buildMetadata({
  title: "My Wishlist | Local Kokani",
  path: "/wishlist",
  noIndex: true,
});


import WishlistPageClient from "@/components/wishlist/WishlistPageClient";

export default function WishlistPage() {
  return <WishlistPageClient />;
}