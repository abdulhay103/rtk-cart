"use client";
import Image from "next/image";
import { BiMinus, BiPlus } from "react-icons/bi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { SuccessToast } from "../shared/formHelper";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { decrement_qty, increment_qty } from "@/lib/rtk-features/cartSlice";

export default function ProductDetailsUi({ product_details }) {
  const cartItemQty = useSelector((state) => state.cartReducer.cartItems);
  const dispatch = useDispatch();
  const router = useRouter();
  let {
    id,
    title,
    img,
    discount,
    price,
    discount_price,
    brand,
    stock,
    category,
  } = product_details;

  const incrementQtr = () => {
    if (cartItemQty < 5) {
      dispatch(increment_qty());
    }
  };
  const decrementQtr = () => {
    if (cartItemQty > 1) {
      dispatch(decrement_qty());
    }
  };

  // Add to Cart Handler
  const addtoCartHandler = async (e) => {
    e.preventDefault();
    SuccessToast("Product added in Cart.");
    router.push(`/products/order/?${id}`);
  };
  return (
    <section className="section-padding container mx-auto">
      <div className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16 xl:gap-20">
        <div className="w-full">
          <div className="relative h-56 w-full overflow-hidden rounded-md border">
            <Image
              src={img}
              fill
              className="absolute object-cover transition-all duration-500 hover:scale-105"
              alt={title}
            />
          </div>
          <div className="mt-6 flex gap-6">
            <div className="w-full">
              <div className="relative h-32 w-full overflow-hidden rounded-md border">
                <Image
                  src={img}
                  fill
                  className="absolute object-cover transition-all duration-500 hover:scale-105"
                  alt={title}
                />
              </div>
            </div>
            <div className="w-full">
              <div className="relative h-32 w-full overflow-hidden rounded-md border">
                <Image
                  src={img}
                  fill
                  className="absolute object-cover transition-all duration-500 hover:scale-105"
                  alt={title}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <h3 className="font-Rubik text-xl font-black text-deepKhaki lg:text-2xl 2xl:text-3xl">
            {title}
          </h3>
          <p className="pt-2 text-lg">
            <span className="pr-1">৳</span>
            {discount ? price - discount_price : price}
            {discount && (
              <span className="text-red-500 pl-2 text-base line-through">
                ৳ {price}
              </span>
            )}
          </p>
          <div className="space-y-1 py-2">
            <p>
              <span className="pr-2 font-semibold">Product SKU:</span>
              IGA-{id}
            </p>
            <p>
              <span className="pr-2 font-semibold">Avability:</span>
              {stock ? "In Stock" : "Out of Stock"}
            </p>
            <p>
              <span className="pr-2 font-semibold">Color:</span>
              {product_details.color}
            </p>
            <p>
              <span className="pr-2 font-semibold">Size:</span>
              {product_details.size}
            </p>
            <p>
              <span className="pr-2 font-semibold">Item Type:</span>
              {category}
            </p>
            <p>
              <span className="pr-2 font-semibold">Brand Name:</span>
              {brand}
            </p>
            <p>
              <span className="pr-2 font-semibold">Any Query:</span>
              +880 1711-236096
            </p>
            <div className="flex items-center gap-5 py-6">
              <div className="flex items-center justify-center gap-3 rounded-md border bg-orange-500">
                <p
                  className={
                    cartItemQty > 1
                      ? "cursor-pointer px-2 text-lg font-bold"
                      : "hidden"
                  }
                  onClick={decrementQtr}
                >
                  <BiMinus className="h-6 w-6 text-white" />
                </p>
                <input
                  readOnly
                  type="text"
                  name="qtr"
                  id="qtr"
                  value={cartItemQty}
                  className="w-16 rounded px-3 py-[6px] text-center focus:outline-none shadow"
                />
                <p
                  onClick={incrementQtr}
                  className={
                    cartItemQty < 5
                      ? "cursor-pointer px-2 text-lg font-bold"
                      : "hidden"
                  }
                >
                  <BiPlus className="h-6 w-6 text-white" />
                </p>
              </div>
              <button
                onClick={(e) => addtoCartHandler(e)}
                type="submit"
                className="hover-300 flex items-center rounded bg-green-500 px-5 py-2 text-white hover:bg-green-500/85"
              >
                <LiaShoppingBagSolid className="size-5" />
                <p className="pl-2">Order Now</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
