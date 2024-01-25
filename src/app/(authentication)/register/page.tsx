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
          New Account
        </h1>
        <form className="flex flex-col" action="/" method="get">
          <label
            className="text-stone-800 test-sm font-normal font-['Inter'] mb-2"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            className="p-3 w-72 h-9 rounded border border-stone-300 mb-4"
            id="name"
            type="text"
            placeholder="Full Name"
          ></input>

          <label
            className="text-stone-800 test-sm font-normal font-['Inter'] mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="p-3 w-72 h-9 rounded border border-stone-300 mb-4"
            id="email"
            type="text"
            placeholder="Email"
          ></input>

          <label
            className="text-stone-800 test-sm font-normal font-['Inter'] mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="p-3 w-72 h-9 rounded border border-stone-300 mb-4"
            id="password"
            type="password"
            placeholder="Password"
          ></input>

          <label
            className="text-stone-800 test-sm font-normal font-['Inter'] mb-2"
            htmlFor="repassword"
          >
            Confirm Password
          </label>
          <input
            className="p-3 w-72 h-9 rounded border border-stone-300 mb-4"
            id="repassword"
            type="password"
            placeholder="Confirm Password"
          ></input>

          <input
            className="w-72 h-9 bg-stone-800 rounded text-white"
            type="submit"
            value="Submit"
          />
        </form>

        {/* Sign up using Socials */}
        <div className="flex flex-col items-center mt-4">
          <p className="mb-2 text-stone-800 text-sm font-normal font-['Inter']">
            or
          </p>
          <p className="mt-2 mb-2 text-stone-800 text-sm font-normal font-['Inter']">
            Sign up using Socials
          </p>
          <div className="mt-2 flex flex-row">
            <Image
              className="ml-2 mr-2"
              src="/facebookIcon.svg"
              width={50}
              height={50}
              alt="Facebook Icon"
            />
            <Image
              className="ml-2 mr-2"
              src="/googleIcon.svg"
              width={50}
              height={50}
              alt="Google Icon"
            />
            <Image
              className="ml-2 mr-2"
              src="/appleIcon.svg"
              width={50}
              height={50}
              alt="Apple Icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
