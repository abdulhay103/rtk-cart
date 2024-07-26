import React from "react";
import { TbShoppingCartQuestion } from "react-icons/tb";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="section-padding">
      <div className="flex w-full justify-center">
        <TbShoppingCartQuestion size={100} className="text-deepKhaki" />
      </div>
      <div className="text-center lg:pt-5">
        <p>Your Cart Is Empty!</p>
        <div className="flex justify-center pt-6">
          <Link
            className="rounded-md bg-primary px-6 py-2 text-whiteSmoke"
            href="/products"
          >
            Explore Products
          </Link>
        </div>
      </div>
    </div>
  );
}
