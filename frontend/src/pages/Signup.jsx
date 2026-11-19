import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { SproutLogo } from "../components/BotanicalDecor";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { register, isAuthenticated, isLoading } = useAuth();

  // Already signed in: signup is done, go straight to the sanctuary.
  if (!isLoading && isAuthenticated) {
    return <Navigate to="/app" replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage("");
    setError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    if (
      !formData.fullName.trim() ||
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password
    ) {
      setError("Please fill in full name, username, email and password.");
      return;
    }

    if (!/^[a-zA-Z0-9_.-]{3,30}$/.test(formData.username.trim())) {
      setError("Username must be 3-30 characters using letters, numbers, dot, dash or underscore.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Password and confirm password do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        password: formData.password,
        avatar,
      });

      // Register now returns tokens + sets cookies, so we're already logged in.
      navigate("/app", { replace: true });
    } catch (err) {
      setError(err?.message || "Could not create your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="calm-bg flex min-h-screen flex-col items-center justify-center px-4 pt-8 pb-5 text-[#243b32] max-[480px]:px-3 max-[480px]:py-5">
      <section className="animate-fade-in w-full max-w-[460px] rounded-[24px] border border-[#e7e9df] bg-[#fffefa] px-8 sm:px-10 py-8 shadow-[0_18px_55px_rgba(39,62,48,0.08)]">
        {/* Brand */}
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

        {/* Welcome */}
        <div className="my-6">
          <p className="mb-2 text-[11px] font-bold tracking-[2px] text-[#69836b] uppercase">
            Your space to grow
          </p>

          <h1 className="m-0 font-serif text-[clamp(28px,6vw,36px)] font-normal tracking-tight text-[#243b32]">
            Create account.
          </h1>

          <p className="mt-1.5 text-xs sm:text-sm text-[#7b827a] leading-relaxed">
            Begin your journey toward steady, mindful student wellbeing.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label
              htmlFor="fullName"
              className="mb-1 block text-xs font-semibold text-[#243b32]"
            >
              Full name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="e.g. Anna Davis"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="name"
              maxLength={100}
              required
              className="h-11 w-full rounded-xl border border-[#dfe4d9] bg-white px-3.5 text-xs sm:text-sm text-[#243b32] outline-none transition-all placeholder:text-[#a5aaa2] focus:border-[#62866b] focus:ring-3 focus:ring-[#62866b]/10"
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-xs font-semibold text-[#243b32]"
            >
              Username
            </label>

            <input
              id="username"
              name="username"
              type="text"
              placeholder="e.g. anna_davis"
              value={formData.username}
              onChange={handleChange}
              autoComplete="username"
              maxLength={30}
              required
              className="h-11 w-full rounded-xl border border-[#dfe4d9] bg-white px-3.5 text-xs sm:text-sm text-[#243b32] outline-none transition-all placeholder:text-[#a5aaa2] focus:border-[#62866b] focus:ring-3 focus:ring-[#62866b]/10"
            />
          </div>

          <div>
            <label
              htmlFor="register-email"
              className="mb-1 block text-xs font-semibold text-[#243b32]"
            >
              Email address
            </label>

            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="you@campus.edu"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="h-11 w-full rounded-xl border border-[#dfe4d9] bg-white px-3.5 text-xs sm:text-sm text-[#243b32] outline-none transition-all placeholder:text-[#a5aaa2] focus:border-[#62866b] focus:ring-3 focus:ring-[#62866b]/10"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-xs font-semibold text-[#243b32]"
            >
              Password
            </label>

            <div className="flex items-center gap-2 rounded-xl border border-[#dfe4d9] bg-white pr-3 transition-all focus-within:border-[#62866b] focus-within:ring-3 focus-within:ring-[#62866b]/10">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
                className="h-11 w-full border-0 bg-transparent px-3.5 text-xs sm:text-sm text-[#243b32] outline-none placeholder:text-[#a5aaa2]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="shrink-0 p-1 text-[#7b827a] hover:text-[#355b44]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-1 block text-xs font-semibold text-[#243b32]"
            >
              Confirm password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Repeat your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
              required
              className="h-11 w-full rounded-xl border border-[#dfe4d9] bg-white px-3.5 text-xs sm:text-sm text-[#243b32] outline-none transition-all placeholder:text-[#a5aaa2] focus:border-[#62866b] focus:ring-3 focus:ring-[#62866b]/10"
            />
          </div>

          <div>
            <label
              htmlFor="avatar"
              className="mb-1 block text-xs font-semibold text-[#243b32]"
            >
              Profile photo (optional)
            </label>
            <input
              id="avatar"
              name="avatar"
              type="file"
              accept="image/*"
              onChange={(event) => setAvatar(event.target.files?.[0] || null)}
              className="w-full text-xs text-[#7b827a] file:mr-3 file:rounded-lg file:border-0 file:bg-[#eef2ea] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-[#355b44]"
            />
          </div>

          <button
            className="btn-primary w-full h-11 text-xs sm:text-sm shadow-sm hover:shadow mt-4 flex items-center justify-center gap-2 disabled:opacity-60"
            type="submit"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? "Creating account..." : "Create Account"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {message && !error && (
            <p className="mt-2 text-xs leading-relaxed text-[#355b44] font-medium text-center">
              {message}
            </p>
          )}
          {error && (
            <p
              className="mt-2 rounded-xl border border-[#f5d0cc] bg-[#fbeeed] px-3 py-2 text-xs leading-relaxed text-[#8e3c35] font-medium text-center"
              role="alert"
            >
              {error}
            </p>
          )}
        </form>

        {/* Login Link */}
        <p className="mt-5 text-center text-xs text-[#777e75]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="ml-1 font-semibold text-[#4b7355] hover:underline"
          >
            Log in
          </Link>
        </p>

        {/* Privacy Note */}
        <div className="mt-5 flex items-center justify-center gap-2 border-t border-[#eceee7] pt-4 text-center text-[11px] text-[#858b81]">
          <span className="text-[#6a8d6e]">♡</span>
          <span>Your wellbeing matters.</span>
        </div>
      </section>
    </main>
  );
}

export default Signup;
