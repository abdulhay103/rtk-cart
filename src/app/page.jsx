import Link from "next/link";

export default function mainPage() {
  return (
    <div className=" flex items-center justify-center min-h-screen">
      <Link href={"/products"} className=" text-green-500 text-2xl font-bold">
        Buy Product
      </Link>
    </div>
  );
}
