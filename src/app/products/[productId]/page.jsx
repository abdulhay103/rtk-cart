import ProductDetailsUi from "@/app/components/products/ProductDetailsUi";
import products from "@/lib/data/productData";

export default function ProductDetails({ params }) {
  let id = parseInt(params.productId);
  let product_details = products.filter((product) => {
    return product.id == id;
  });
  return <ProductDetailsUi product_details={product_details[0]} />;
}
