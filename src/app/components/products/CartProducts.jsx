"use client";
import { BiTrash } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { ErrorToast, SuccessToast } from "@/src/utils/formHelper";
import ConfirmOrders from "./ConfirmOrders";

const TABLE_HEAD = [
  " Product",
  "Quantity",
  "Price",
  "Discount",
  "Sub Total",
  "Delete",
];

export function CartProducts({ CartDatas }) {
  const router = useRouter();
  let { cartItems, user } = CartDatas;
  const result = cartItems.reduce((acc, item) => {
    const { qty } = item;
    const { title, price, discount_price } = item.products;
    if (!acc[title]) {
      acc[title] = {
        count: 1,
        totalPrice: price * qty,
        totalDiscount: discount_price * qty,
        totalQty: qty,
      };
    } else {
      acc[title].count += 1;
      acc[title].totalPrice += price * qty;
      acc[title].totalDiscount += discount_price * qty;
      acc[title].totalQty += qty;
    }
    return acc;
  }, {});

  // Create Cart Items Array
  const cartItemsArray = Object.keys(result).map((title) => {
    const item = cartItems.find((item) => item.products.title === title);
    return {
      userId: item.user_id,
      productId: item.product_id,
      title,
      count: result[title].count,
      totalPrice: result[title].totalPrice,
      totalDiscount: result[title].totalDiscount,
      totalQty: result[title].totalQty,
    };
  });

  // Delete Cart Item
  const deleteItem = async (productId, userId) => {
    let jsonBody = {
      user_id: userId,
      product_id: productId,
    };
    try {
      const config = {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonBody),
      };
      const req = await fetch("/api/products/cart", config);
      let res = await req.json();
      if (res.status === "Fail, Internal Error!") {
        ErrorToast(res.status);
      } else {
        SuccessToast(res.status);
        router.refresh();
      }
    } catch (e) {
      ErrorToast("Fail!, Server Error");
    }
  };
  return (
    <div className="section-padding container">
      <div className="overflow-hidden">
        <h2 className="bg-primary py-2 text-center text-xl font-bold text-whiteSmoke lg:text-2xl">
          Your Cart items
        </h2>
        <div className="h-full w-full overflow-x-auto">
          <table className="w-full table-auto border border-primary text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-gray bg-gray/20 p-4"
                  >
                    <p className="font-normal leading-none opacity-70">
                      {head}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cartItemsArray.map(
                (
                  {
                    userId,
                    productId,
                    title,
                    totalQty,
                    totalPrice,
                    totalDiscount,
                  },
                  index,
                ) => {
                  const isLast = index === cartItems.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
                  return (
                    <tr key={index}>
                      <td className={classes}>
                        <p className="font-normal">{title}</p>
                      </td>
                      <td className={classes}>
                        <p className="font-normal">{totalQty}</p>
                      </td>
                      <td className={classes}>
                        <p className="font-normal">
                          {totalPrice}
                          <span> &#2547;</span>
                        </p>
                      </td>
                      <td className={classes}>
                        <p className="font-normal">
                          {totalDiscount}
                          <span> &#2547;</span>
                        </p>
                      </td>
                      <td className={classes}>
                        <p className="font-normal">
                          {totalPrice - totalDiscount}
                          <span> &#2547;</span>
                        </p>
                      </td>
                      <td className={classes}>
                        <BiTrash
                          onClick={() => {
                            deleteItem(productId, userId);
                          }}
                          size={20}
                          color="red"
                          className="cursor-pointer"
                        />
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </div>
      </div>
      <ConfirmOrders confirmCartDatas={{ cartItemsArray, user }} />
    </div>
  );
}
