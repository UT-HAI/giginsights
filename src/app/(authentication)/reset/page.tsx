import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-center items-center">
      {/* Regular Sign up */}
      <div className="flex flex-col pl-6 pt-6">
        <Link className="mb-2" href="/">
          <Image
            height="15"
            width="15"
            src={"/leftArrow.svg"}
            alt={"leftArrow"}
          ></Image>
        </Link>
        <h1 className="text-stone-800 text-xl font-semibold font-['Inter'] mb-6">
          Reset Password
        </h1>
        <form className="flex flex-col" action="/" method="get">
          <label
            className="text-stone-800 test-sm font-normal font-['Inter'] mb-2"
            htmlFor="password"
          >
            New Password
          </label>
          <input
            className="p-3 w-72 h-9 rounded border border-stone-300 mb-4"
            id="password"
            type="password"
            placeholder="password"
          ></input>

          <label
            className="text-stone-800 test-sm font-normal font-['Inter'] mb-2"
            htmlFor="confirmpassword"
          >
            Confirm Password
          </label>
          <input
            className="p-3 w-72 h-9 rounded border border-stone-300 mb-4"
            id="confirmpassword"
            type="password"
            placeholder="Password"
          ></input>
          <input
            className="w-72 h-9 bg-stone-800 rounded text-white"
            type="submit"
            value="Submit"
          />
        </form>
      </div>
    </div>
  );
}
