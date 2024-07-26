import Link from "next/link";

export default function mainPage() {
  return (
    <div className=" flex items-center justify-center min-h-screen">
      <div className=" space-y-10 text-center">
        <h1 className=" text-blue-600 text-2xl font-black">Welcome to RTK dream Factory!</h1>
        <Link href={"/products"} className=" text-orange-500 text-lg font-bold">Buy Product</Link>
      </div>
    </div>
  );
}
