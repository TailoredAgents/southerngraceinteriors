import { CartPage } from "./CartPage";
import { createMetadata } from "@/app/lib/seo";
export const metadata = createMetadata({ title: "Shopping Cart", description: "Review the furnishings selected for your Southern Grace Interiors collection.", path: "/cart", noIndex: true });
export default function Page() { return <CartPage />; }
