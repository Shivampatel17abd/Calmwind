import { Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    // Demo only: no real authentication yet.
    setMessage("Login form submitted! Connect your backend next.");
  }

  return (
    <main className="calm-bg flex min-h-screen flex-col items-center justify-center px-5 pt-12 pb-5 max-[480px]:px-[14px] max-[480px]:py-6">
      <section className="animate-fade-in w-full max-w-[460px] rounded-[24px] border border-[#e7e9df] bg-[#fffefa] p-10 shadow-[0_18px_55px_rgba(39,62,48,0.08)] max-[480px]:rounded-[19px] max-[480px]:px-[22px] max-[480px]:py-7">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[22px] font-bold tracking-[-0.7px] text-[#243b32] no-underline"
        >
          <div
            className="grid h-9 w-9 place-items-center rounded-xl bg-[#dce8d5] text-[25px] text-[#355b44]"
            aria-hidden="true"
          >
            ✿
          </div>
          <span>CalmWind</span>
        </Link>

        <div className="mt-[35px] mb-7 max-[480px]:mt-7">
          <p className="mb-3 text-[11px] font-bold tracking-[2px] text-[#69836b]">
            YOUR SPACE TO BREATHE
          </p>

          <h1 className="m-0 font-[Georgia,serif] text-[clamp(34px,7vw,43px)] font-medium tracking-[-1.4px]">
            Welcome back.
          </h1>

          <p className="mt-3 text-sm leading-[1.7] text-[#7b827a]">
            Take a moment for yourself. We're glad you're here.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-[21px]">
            <label
              htmlFor="email"
              className="mb-[9px] block text-[13px] font-semibold"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
              }}
              autoComplete="email"
              required
              className="h-[50px] w-full min-w-0 rounded-[10px] border border-[#dfe4d9] bg-white px-[14px] text-sm text-[#243b32] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#a5aaa2] focus:border-[#62866b] focus:shadow-[0_0_0_3px_rgba(98,134,107,0.13)]"
            />
          </div>

          <div className="mb-[21px]">
            <label
              htmlFor="password"
              className="mb-[9px] block text-[13px] font-semibold"
            >
              Password
            </label>

            <div className="flex items-center gap-2 rounded-[10px] border border-[#dfe4d9] bg-white pr-3 transition-[border-color,box-shadow] duration-200 focus-within:border-[#62866b] focus-within:shadow-[0_0_0_3px_rgba(98,134,107,0.13)]">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setMessage("");
                }}
                autoComplete="current-password"
                required
                className="h-[50px] w-full min-w-0 rounded-[10px] border-0 bg-transparent px-[14px] text-sm text-[#243b32] outline-none placeholder:text-[#a5aaa2]"
              />

              <button
                className="shrink-0 cursor-pointer border-0 bg-transparent text-xs font-bold text-[#52765a] outline-none focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#8bb99a]"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={
                  showPassword ? "Hide password" : "Show password"
                }
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="-mt-[7px] mb-6 flex justify-end text-xs">
            <a
              href="#forgot-password"
              className="font-semibold text-[#4b7355] no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#8bb99a]"
            >
              Forgot password?
            </a>
          </div>

          <button
            className="flex min-h-[51px] w-full cursor-pointer items-center justify-center gap-3 rounded-[11px] border-0 bg-[#355b44] px-[18px] py-3 text-sm font-semibold text-white transition-[background,transform] duration-200 hover:bg-[#294b37] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#8bb99a]"
            type="submit"
          >
            Log in <span aria-hidden="true">→</span>
          </button>

          <p
            className="mt-3 min-h-5 overflow-wrap-anywhere text-xs leading-[1.6] text-[#52765a]"
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        </form>

        <p className="mt-[19px] text-center text-[13px] text-[#777e75]">
          New to CalmWind?{" "}
          <Link
            to="/signup"
            className="ml-[3px] font-semibold text-[#4b7355] no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#8bb99a]"
          >
            Create an account
          </Link>
        </p>

        <div className="mt-[29px] flex items-start justify-center gap-[9px] border-t border-[#eceee7] pt-5 text-center text-[11px] leading-[1.6] text-[#858b81]">
          <span className="text-[17px] leading-[1.2] text-[#6a8d6e]">
            ♡
          </span>
          <span>Your wellbeing matters.</span>
        </div>
      </section>
    </main>
  );
}

export default Login;