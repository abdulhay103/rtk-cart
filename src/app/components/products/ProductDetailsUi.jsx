"use client";
import Image from "next/image";
import React, { useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { ErrorToast, SuccessToast } from "../shared/formHelper";

export default function ProductDetailsUi({ product_details }) {
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

  const [qtr, setQtr] = useState(1);
  const incrementQtr = () => {
    if (qtr < 5) {
      setQtr((qtr) => qtr + 1);
    }
  };
  const decrementQtr = () => {
    if (qtr > 1) {
      setQtr((qtr) => qtr - 1);
    }
  };

  let addToCartValues = {
    color: product_details.color,
    size: product_details.size,
    qty: qtr,
    status: "pending",
  };

  // Add to Cart Handler
  const addtoCartHandler = async (e) => {
    e.preventDefault();

    try {
      const req = await fetch("/api/products/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addToCartValues),
      });
      let res = await req.json();
      if (res.status === "Successfully Product add to cart.") {
        SuccessToast(res.status);
        router.push("/products/cart");
      } else {
        ErrorToast(res.status);
      }
    } catch (error) {
      ErrorToast("Server Error");
    }
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
                    qtr > 1 ? "cursor-pointer px-2 text-lg font-bold" : "hidden"
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
                  value={qtr}
                  className="w-16 rounded px-3 py-[6px] text-center focus:outline-none shadow"
                />
                <p
                  onClick={incrementQtr}
                  className={
                    qtr < 5 ? "cursor-pointer px-2 text-lg font-bold" : "hidden"
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
