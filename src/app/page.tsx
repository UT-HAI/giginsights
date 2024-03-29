import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  if (session?.user) {
    redirect("/home");
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
      <div className="flex">
        <Image
          src="/home.svg"
          width={500}
          height={500}
          alt="home picture"
        ></Image>
      </div>
      <div className="flex justify-center items-center w-72 h-9 bg-stone-800 rounded mt-4 cursor-pointer">
        <Link
          href="/login"
          className=" text-white text-sm font-normal font-['Inter']"
        >
          Login
        </Link>
      </div>
      <div className="flex justify-center items-center w-72 h-9 bg-white rounded border border-stone-800 mt-4 cursor-pointer">
        <Link
          href="/register"
          className="text-stone-800 text-sm font-normal font-['Inter']"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
