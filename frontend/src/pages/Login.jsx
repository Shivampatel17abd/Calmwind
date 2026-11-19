import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { SproutLogo } from "../components/BotanicalDecor";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, isLoading } = useAuth();

  const successMessage = location.state?.message || "";
  const from = location.state?.from;
  const redirectTo = from ? `${from.pathname || "/app"}${from.search || ""}` : "/app";

  // Already signed in: never show the login form again (e.g. after visiting Home).
  if (!isLoading && isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!identifier.trim() || !password) {
      setError("Please enter your email or username and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login({ identifier, password });
      setMessage("Welcome back! Entering your personal sanctuary...");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err?.message || "Login failed. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="calm-bg flex min-h-screen flex-col items-center justify-center px-5 pt-12 pb-5 max-[480px]:px-[14px] max-[480px]:py-6">
      <section className="animate-fade-in w-full max-w-[460px] rounded-[24px] border border-[#e7e9df] bg-[#fffefa] p-10 shadow-[0_18px_55px_rgba(39,62,48,0.08)] max-[480px]:rounded-[19px] max-[480px]:px-[22px] max-[480px]:py-7">
        <Link
          to="/"
          className="flex items-center gap-2.5 text-[22px] font-bold tracking-tight text-[#243b32] no-underline group"
        >
          <div
            className="grid h-9 w-9 place-items-center rounded-xl bg-[#e3ebd9] text-[#355b44] transition-transform group-hover:scale-105"
            aria-hidden="true"
          >
            <SproutLogo className="w-5 h-5" color="#355b44" />
          </div>
          <span className="font-serif font-medium">CalmWind</span>
        </Link>

        <div className="mt-[32px] mb-7 max-[480px]:mt-6">
          <p className="mb-2 text-[11px] font-bold tracking-[2px] text-[#69836b] uppercase">
            Your space to breathe
          </p>

          <h1 className="m-0 font-serif text-[clamp(32px,6vw,40px)] font-normal tracking-tight text-[#243b32]">
            Welcome back.
          </h1>

          <p className="mt-2 text-sm leading-relaxed text-[#7b827a]">
            Take a moment for yourself. We're glad you're here.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="identifier"
              className="mb-1.5 block text-xs font-semibold text-[#243b32]"
            >
              Email or username
            </label>

            <input
              id="identifier"
              type="text"
              placeholder="you@example.com or username"
              value={identifier}
              onChange={(event) => {
                setIdentifier(event.target.value);
                setMessage("");
                setError("");
              }}
              autoComplete="username"
              required
              className="h-12 w-full rounded-xl border border-[#dfe4d9] bg-white px-3.5 text-sm text-[#243b32] outline-none transition-all placeholder:text-[#a5aaa2] focus:border-[#62866b] focus:ring-3 focus:ring-[#62866b]/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-xs font-semibold text-[#243b32]"
            >
              Password
            </label>

            <div className="flex items-center gap-2 rounded-xl border border-[#dfe4d9] bg-white pr-3 transition-all focus-within:border-[#62866b] focus-within:ring-3 focus-within:ring-[#62866b]/10">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setMessage("");
                  setError("");
                }}
                autoComplete="current-password"
                required
                className="h-12 w-full border-0 bg-transparent px-3.5 text-sm text-[#243b32] outline-none placeholder:text-[#a5aaa2]"
              />

              <button
                className="shrink-0 text-[#7b827a] hover:text-[#355b44] p-1"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <p className="text-right text-[11px] leading-relaxed text-[#858b81]">
            Forgot password? The backend has no reset endpoint yet. After login, use
            Account Settings to change it.
          </p>

          <button
            className="btn-primary w-full h-12 text-sm shadow-sm hover:shadow mt-2 flex items-center justify-center gap-2 disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? "Logging in..." : "Log in to your sanctuary"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {(message || successMessage) && !error && (
            <p
              className="mt-3 text-xs leading-relaxed text-[#355b44] font-medium"
              role="status"
            >
              {message || successMessage}
            </p>
          )}
          {error && (
            <p
              className="mt-3 rounded-xl border border-[#f5d0cc] bg-[#fbeeed] px-3 py-2 text-xs leading-relaxed text-[#8e3c35] font-medium"
              role="alert"
            >
              {error}
            </p>
          )}
        </form>

        <p className="mt-6 text-center text-xs text-[#777e75]">
          New to CalmWind?{" "}
          <Link
            to="/signup"
            className="ml-1 font-semibold text-[#4b7355] hover:underline"
          >
            Create an account
          </Link>
        </p>

        <div className="mt-6 flex items-center justify-center gap-2 border-t border-[#eceee7] pt-4 text-center text-[11px] text-[#858b81]">
          <span className="text-[#6a8d6e]">♡</span>
          <span>Your wellbeing matters.</span>
        </div>
      </section>
    </main>
  );
}

export default Login;
