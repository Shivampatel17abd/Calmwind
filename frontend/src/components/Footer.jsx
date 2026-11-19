import { Link } from "react-router-dom";
import { PhoneCall, MessageSquare, ArrowRight, Heart } from "lucide-react";
import { SproutLogo } from "./BotanicalDecor";
import { useAuth } from "../context/AuthContext";

export default function Footer() {
  const { isAuthenticated } = useAuth();
  return (
    <footer id="help" className="border-t border-[#e7e9df] bg-[#fffefa]/90 mt-12">
      {/* Helpline banner */}
      <div className="max-w-5xl mx-auto px-4 pt-12 pb-6">
        <div className="p-6 sm:p-8 rounded-[22px] bg-[#fbf2e3] border border-[#f0debe] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <PhoneCall className="w-5 h-5 text-[#7a4c28]" />
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
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="sms:741741"
              className="px-4 py-2.5 rounded-xl bg-white/80 hover:bg-white text-[#7a4c28] border border-[#f0debe] text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Text HOME to 741741</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-[#eceee7]">
        <div className="flex items-center gap-2.5 text-lg font-bold text-[#243b32]">
          <div className="w-7 h-7 rounded-lg bg-[#dce8d5] grid place-items-center">
            <SproutLogo className="w-4 h-4" color="#355b44" />
          </div>
          <span className="font-serif font-medium tracking-tight">CalmWind</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#7b827a]">
          <Link to="/" className="hover:text-[#243b32] transition-colors">
            Home
          </Link>
          <Link to="/#features" className="hover:text-[#243b32] transition-colors">
            Features
          </Link>
          <Link to="/track-health" className="hover:text-[#243b32] transition-colors">
            Health Tracker
          </Link>
          <Link to="/notes" className="hover:text-[#243b32] transition-colors">
            Notepad
          </Link>
          <Link to="/app/journal" className="hover:text-[#243b32] transition-colors">
            Journal
          </Link>
          <Link to="/app/support" className="hover:text-[#243b32] transition-colors">
            Helplines
          </Link>
          {isAuthenticated ? (
            <>
              <Link to="/app" className="hover:text-[#243b32] transition-colors">
                Sanctuary
              </Link>
              <Link to="/app/account" className="hover:text-[#243b32] transition-colors">
                Account
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#243b32] transition-colors">
                Login
              </Link>
              <Link to="/signup" className="hover:text-[#243b32] transition-colors">
                Signup
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#6a8d6e]">
          <Heart className="w-3.5 h-3.5 fill-[#6a8d6e]/20" />
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
