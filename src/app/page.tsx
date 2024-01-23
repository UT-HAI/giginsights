import Link from 'next/link';

export default function Home() {
  return (
    <div className="SplashScreen w-80 h-96 relative bg-white">
      <div className="flex justify-center items-center w-72 h-9 left-[22px] top-[503px] absolute bg-white rounded border border-stone-800">
        <Link href="/register" className="text-stone-800 text-sm font-normal font-['Inter']">Register</Link>
      </div>
      <div className="flex justify-center items-center w-72 h-9 left-[21px] top-[453px] absolute bg-stone-800 rounded">
        <Link href="/login" className=" text-white text-sm font-normal font-['Inter']"> Login </Link>
      </div>
    </div>
  );
}
