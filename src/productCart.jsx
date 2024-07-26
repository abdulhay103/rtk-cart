import productData from "@/lib/data/productData";
export default function productCart() {
  return (
    <section className=" container mx-auto">
      <div className="grid grid-cols-4 gap-5 p-5">
        {productData.map(
          ({
            title,
            price,
            discount,
            discount_price,
            image,
            product_details,
          }) => (
            <div
              key={id}
              className="hover-500 col-span-2 min-h-72 rounded border border-primary p-5 shadow-md hover:border-deepKhaki xl:col-span-1"
            >
              <Link
                href={`/products/${id}`}
                className="relative flex h-36 w-full items-center justify-center overflow-hidden rounded-lg 2xl:h-40"
              >
                <Image
                  src={image}
                  fill
                  sizes={300}
                  priority={false}
                  alt={title}
                  className="hover-500 object-cover hover:scale-105"
                />
              </Link>
              <div className="pt-4">
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
                    <span className="pr-1">Size:</span>
                    {product_details?.size}
                  </p>
                </div>

                <SpinnerButton
                  btnText="Add to Cart"
                  btnAction={isDisabled}
                  sumbitAction={submit}
                  clickAction={() =>
                    addtoCartHadler(
                      id,
                      product_details?.size,
                      product_details?.color
                    )
                  }
                />
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}
