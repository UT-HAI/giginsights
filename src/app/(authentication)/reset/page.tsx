import { InputField } from "@/components/forms/InputField";
import { NavigationIconLink } from "@/components/ui/NavigationIconLink";

export default function Page() {
  return (
    <div className="flex justify-center items-center">
      {/* Regular Sign up */}
      <div className="flex flex-col pl-6 pt-6">
        <NavigationIconLink href="/" />
        <h1 className="text-stone-800 text-xl font-semibold font-['Inter'] mb-6">
          Reset Password
        </h1>
        <form className="flex flex-col" action="/" method="get">
          <InputField
            id="password"
            type="password"
            placeholder="password"
            label="New Password"
          />
          <InputField
            id="confirmpassword"
            type="password"
            placeholder="Password"
            label="Confirm Password"
          />
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
