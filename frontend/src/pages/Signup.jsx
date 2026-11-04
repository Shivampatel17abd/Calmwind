import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    rollno: "",
    email: "",
    contact: "",
  });

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (
      !formData.name.trim() ||
      !formData.rollno.trim() ||
      !formData.email.trim() ||
      !formData.contact.trim()
    ) {
      setMessage("Please fill in all the fields.");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.contact)) {
      setMessage("Please enter a valid 10-digit contact number.");
      return;
    }

    console.log("Registration details:", formData);
  }

  return (
    <main className="calm-bg flex min-h-screen flex-col items-center justify-center px-4 pt-8 pb-5 text-[#243b32] max-[480px]:px-3 max-[480px]:py-5">
      <section className="animate-fade-in w-full max-w-[460px] rounded-[24px] border border-[#e7e9df] bg-[#fffefa] px-10 py-[34px] shadow-[0_18px_55px_rgba(39,62,48,0.08)] max-[480px]:rounded-[19px] max-[480px]:px-[21px] max-[480px]:py-[26px]">
        {/* Brand */}
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

        {/* Welcome */}
        <div className="my-[26px] mb-[23px] max-[480px]:mt-[23px]">
          <p className="mb-[10px] text-[11px] font-bold tracking-[2px] text-[#69836b]">
            YOUR SPACE TO GROW
          </p>

          <h1 className="m-0 font-['Playfair_Display',Georgia,serif] text-[clamp(32px,7vw,40px)] font-medium tracking-[-1px]">
            Create account.
          </h1>

          <p className="mt-[10px] text-[13px] leading-[1.7] text-[#7b827a]">
            Begin your journey toward better mental wellbeing.
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-[17px]">
            <label
              htmlFor="name"
              className="mb-2 block text-[13px] font-semibold"
            >
              Full name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              maxLength={100}
              required
              className="block h-[47px] w-full min-w-0 rounded-[10px] border border-[#dfe4d9] bg-white px-[13px] text-[13px] text-[#243b32] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#a5aaa2] focus:border-[#62866b] focus:shadow-[0_0_0_3px_rgba(98,134,107,0.13)]"
            />
          </div>

          <div className="mb-[17px]">
            <label
              htmlFor="rollno"
              className="mb-2 block text-[13px] font-semibold"
            >
              College roll number
            </label>

            <input
              id="rollno"
              name="rollno"
              type="text"
              placeholder="Enter your roll number"
              value={formData.rollno}
              onChange={handleChange}
              maxLength={30}
              required
              className="block h-[47px] w-full min-w-0 rounded-[10px] border border-[#dfe4d9] bg-white px-[13px] text-[13px] text-[#243b32] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#a5aaa2] focus:border-[#62866b] focus:shadow-[0_0_0_3px_rgba(98,134,107,0.13)]"
            />
          </div>

          <div className="mb-[17px]">
            <label
              htmlFor="register-email"
              className="mb-2 block text-[13px] font-semibold"
            >
              Email address
            </label>

            <input
              id="register-email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="block h-[47px] w-full min-w-0 rounded-[10px] border border-[#dfe4d9] bg-white px-[13px] text-[13px] text-[#243b32] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#a5aaa2] focus:border-[#62866b] focus:shadow-[0_0_0_3px_rgba(98,134,107,0.13)]"
            />
          </div>

          <div className="mb-[17px]">
            <label
              htmlFor="contact"
              className="mb-2 block text-[13px] font-semibold"
            >
              Contact number
            </label>

            <input
              id="contact"
              name="contact"
              type="tel"
              inputMode="numeric"
              placeholder="Enter 10-digit mobile number"
              value={formData.contact}
              onChange={handleChange}
              autoComplete="tel"
              maxLength={10}
              pattern="[0-9]{10}"
              title="Enter a 10-digit mobile number"
              required
              className="block h-[47px] w-full min-w-0 rounded-[10px] border border-[#dfe4d9] bg-white px-[13px] text-[13px] text-[#243b32] outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-[#a5aaa2] focus:border-[#62866b] focus:shadow-[0_0_0_3px_rgba(98,134,107,0.13)]"
            />
          </div>

          <button
            className="mt-[5px] flex min-h-[49px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-[11px] border-0 bg-[#355b44] px-[18px] py-3 text-sm font-semibold text-white transition-[background,transform] duration-200 hover:bg-[#294b37] active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#8bb99a]"
            type="submit"
          >
            Create Account <span aria-hidden="true">→</span>
          </button>

          <p
            className="mt-3 min-h-[18px] overflow-wrap-anywhere text-xs leading-[1.6] text-[#52765a]"
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        </form>

        {/* Login Link */}
        <p className="mt-[13px] text-center text-xs text-[#777e75]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="ml-[3px] font-bold text-[#4b7355] no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#8bb99a]"
          >
            Log in
          </Link>
        </p>

        {/* Privacy Note */}
        <div className="mt-[23px] flex items-start justify-center gap-2 border-t border-[#eceee7] pt-[17px] text-center text-[10px] leading-[1.6] text-[#858b81]">
          <span className="text-base text-[#6a8d6e]" aria-hidden="true">
            ♡
          </span>
          <span>Your wellbeing matters.</span>
        </div>
      </section>
    </main>
  );
}

export default Signup;
