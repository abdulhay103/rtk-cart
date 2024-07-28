"use client";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import products from "@/lib/data/productData";
import {
  decrement_qty,
  increment_qty,
  update_qty,
} from "@/lib/rtk-features/cartSlice";
import { SuccessToast } from "../shared/formHelper";

const TABLE_HEAD = [
  "Product",
  "Quantity",
  "Price",
  "Discount",
  "Sub Total",
  "Delete",
];

export function CartProducts() {
  let { qty, productId } = useSelector((state) => state.cartReducer.cartItems);
  const dispatch = useDispatch();
  let productArray = products.filter((product) => product.id == productId);
  let product = productArray[0];

  const incrementQtr = () => {
    if (qty < 5) {
      dispatch(increment_qty(product?.id));
    }
  };
  const decrementQtr = () => {
    if (qty > 1) {
      dispatch(decrement_qty(product?.id));
    }
  };

  const deleteHandler = () => {
    window.location.href = "/products";
    dispatch(update_qty());
    SuccessToast("Your Item is deleted.");
  };

  return (
    <div className="section-padding container mx-auto">
      <div className="overflow-hidden">
        <h2 className="bg-primary py-2 text-center text-xl font-bold text-whiteSmoke lg:text-2xl">
          Your Cart items
        </h2>
        <div className="h-full w-full overflow-x-auto">
          <table className="w-full table-auto border text-left rounded">
            <thead className=" bg-slate-50">
              <tr className="">
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={index}
                    className="border-b border-gray bg-gray/20 py-4"
                  >
                    <p className="font-normal leading-none opacity-70">
                      {head}
                    </p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p className="font-normal">{product?.title}</p>
                </td>
                <td>
                  <div className="flex items-center gap-2 ">
                    <div
                      className={
                        qty > 1
                          ? "cursor-pointer px-2 text-lg font-bold border rounded bg-slate-100"
                          : "hidden"
                      }
                      onClick={decrementQtr}
                    >
                      <BiMinus className="h-4 w-4" />
                    </div>
                    <input
                      readOnly
                      type="text"
                      name="qtr"
                      id="qtr"
                      value={qty}
                      className="text-center focus:outline-none w-7"
                    />
                    <div
                      onClick={incrementQtr}
                      className={
                        qty < 5
                          ? "cursor-pointer px-2 text-lg font-bold border rounded bg-slate-100"
                          : "hidden"
                      }
                    >
                      <BiPlus className="h-4 w-4" />
                    </div>
                  </div>
                </td>
                <td>
                  <p className="font-normal">
                    {qty * product?.price}
                    <span> &#2547;</span>
                  </p>
                </td>
                <td>
                  <p className="font-normal">
                    {qty * product?.discount_price}
                    <span> &#2547;</span>
                  </p>
                </td>
                <td>
                  <p className="font-normal">
                    {qty * product?.price - qty * product?.discount_price}
                    <span> &#2547;</span>
                  </p>
                </td>
                <td>
                  <BiTrash
                    onClick={() => deleteHandler()}
                    size={20}
                    color="red"
                    className="cursor-pointer"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
