import Link from "next/link";

export default function OrderPage() {
  return (
    <div className=" flex min-h-screen w-full justify-center items-center">
      <div>
        <h1>Order Page</h1>
        <Link href={"/products"}>Buy another</Link>
      </div>
    </div>
  );
}
