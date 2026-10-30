import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer id="help" className="border-t border-[#e7e9df] bg-[#fffefa]/90 mt-12">
      {/* Helpline banner */}
      <div className="max-w-5xl mx-auto px-4 pt-12 pb-6">
        <div className="p-6 sm:p-8 rounded-[22px] bg-[#fbf2e3] border border-[#f0debe] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-amber-700 text-lg">✿</span>
              <h3 className="font-serif text-lg sm:text-xl font-medium text-[#5c371d]">
                Immediate support is always here for you
              </h3>
            </div>
            <p className="text-sm text-[#7a4c28] leading-relaxed max-w-xl">
              If you or a fellow student are experiencing severe distress or crisis, remember you are never alone. Free, confidential, and professional support is available 24/7.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="tel:988"
              className="px-4 py-2.5 rounded-xl bg-[#7a4c28] hover:bg-[#5c371d] text-white text-xs sm:text-sm font-semibold shadow-xs hover:shadow transition-all inline-flex items-center gap-2"
            >
              <span>Call / Text 988</span>
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="sms:741741"
              className="px-4 py-2.5 rounded-xl bg-white/80 hover:bg-white text-[#7a4c28] border border-[#f0debe] text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2"
            >
              <span>Text HOME to 741741</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-[#eceee7]">
        <div className="flex items-center gap-2.5 text-lg font-bold text-[#243b32]">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-[#dce8d5] text-sm text-[#355b44]">
            ✿
          </div>
          <span className="font-medium tracking-tight">CalmWind</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#7b827a]">
          <a href="#home" className="hover:text-[#243b32] transition-colors">Home</a>
          <a href="#features" className="hover:text-[#243b32] transition-colors">Features</a>
          <Link to="/login" className="hover:text-[#243b32] transition-colors">Login</Link>
          <Link to="/signup" className="hover:text-[#243b32] transition-colors">Signup</Link>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#6a8d6e]">
          <span className="text-sm">♡</span>
          <span>Your wellbeing matters.</span>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-5xl mx-auto px-4 py-6 text-center">
        <p className="text-xs text-[#7b827a] leading-relaxed">
          CalmWind is a student project and is not a substitute for professional help.
        </p>
      </div>
    </footer>
  );
}
