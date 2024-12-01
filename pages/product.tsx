import ProductPage from "@/components/product-page";
import { Suspense } from "react";

export default function Product() {
  return( 
    <Suspense fallback={<div>Loading...</div>}>
  <ProductPage />
  </Suspense>);
}