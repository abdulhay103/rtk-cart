import Link from "next/link";

export default function mainPage() {
  return (
    <div className=" flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className=" text-blue-600 text-2xl font-black pb-6">
          Welcome to RTK Dream Factory!
        </h1>
        <Link href={"/products"} className=" text-orange-500 text-lg font-bold">
          Buy Product
        </Link>
      </div>
    </div>
  );
}
