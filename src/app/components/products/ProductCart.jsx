import products from "@/lib/data/productData";
import Image from "next/image";
import Link from "next/link";
export default function ProductCart() {
  return (
    <section className=" container mx-auto py-10">
      <div className="grid grid-cols-4 gap-5">
        {products.map(
          ({ id, title, img, price, discount, discount_price, brand }) => (
            <div
              key={id}
              className="hover-500 col-span-2 rounded overflow-hidden border shadow-md hover:border-deepKhaki xl:col-span-1"
            >
              <Link
                href={`/products/${id}`}
                className="relative flex h-36 w-full items-center justify-center  2xl:h-40"
              >
                <Image
                  src={img}
                  fill
                  sizes={200}
                  priority={false}
                  alt={title}
                  className="hover-500 object-cover hover:scale-105"
                />
              </Link>
              <div className="p-4">
                <Link
                  href={`/products/${id}`}
                  className="text-xs font-bold text-primary lg:text-base"
                >
                  {title}
                </Link>
                <p className="pt-1 font-semibold text-deepKhaki">
                  <span className="pr-1 text-xs lg:text-sm">৳</span>
                  {(discount = true ? price - discount_price : price)}{" "}
                  {discount && (
                    <span className="pl-2 text-xs text-red line-through">
                      {price}
                    </span>
                  )}
                </p>
                <div className="flex justify-between pt-2">
                  <p className="text-xs lg:text-sm">
                    <span className="pr-1">Brand:</span>
                    {brand}
                  </p>
                </div>
              </div>
              <div className=" flex justify-center bg-amber-500 hover:bg-green-500 hover-300 hover:text-white">
                <Link
                  href={`products/${id}`}
                  className="w-full text-center py-2 inline-block "
                >
                  Buy Now
                </Link>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
