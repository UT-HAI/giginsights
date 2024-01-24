import Image from 'next/image'
export default function Page() {
  return (
    <div className="Login w-80 h-96 relative bg-white">
      <div className="FlatColorIconsGoogle w-9 h-9   " />
      <div className="Group1 h-16   ">
        <div className="EmailId    text-stone-800 text-sm font-normal font-['Inter']">Email ID</div>
        <div className="Rectangle1 w-72 h-9    rounded border border-stone-300" />
      </div>
      <div className="Group2 w-72 h-16   ">
        <div className="Password    text-stone-800 text-sm font-normal font-['Inter']">Password</div>
        <div className="Rectangle2 w-72 h-9    rounded border border-zinc-300" />
        <div className="PhEyeLight w-6 h-6   " />
      </div>
      <div className="Rectangle3 w-72 h-9    bg-stone-800 rounded" />
      <div className="Login    text-white text-sm font-normal font-['Inter']">Login</div>
      <div className="Or    text-stone-800 text-sm font-normal font-['Inter']">or</div>
      <div className="SignInUsingSocials    text-stone-800 text-sm font-normal font-['Inter']">Sign in using socials</div>

      <div>
        <Image src="/facebookIcon.svg" width={50} height={50} alt="Facebook Icon"></Image>
      </div>

      <div>
        <Image src="/googleIcon.svg" width={50} height={50} alt="Google Icon"></Image>
        <div>
        </div>
        <Image src="/appleIcon.svg" width={50} height={50} alt="Apple Icon"></Image>
      </div>

      <div className="ForgotPassword    text-stone-800 text-xs font-normal font-['Inter'] underline">Forgot password</div>
      <div className="DonTHaveAnAccountSignUp   ">
        <span className="text-stone-800 text-xs font-normal font-['Inter']">Don’t have an account? </span>
        <span className="text-stone-800 text-xs font-normal font-['Inter'] underline">Sign up</span>
      </div>
    </div>
  );
}
