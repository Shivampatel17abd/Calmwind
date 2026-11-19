import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  HeartHandshake,
  LogOut,
  Menu,
  X,
  PhoneCall,
  Settings,
} from "lucide-react";
import { SproutLogo } from "./BotanicalDecor";
import { useAuth } from "../context/AuthContext";

export default function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
      navigate("/login", { replace: true });
    }
  }

  const navItems = [
    {
      to: "/app",
      end: true,
      label: "Home",
      icon: LayoutDashboard,
    },
    {
      to: "/app/journal",
      end: false,
      label: "My Journal",
      icon: BookOpen,
    },
    {
      to: "/app/support",
      end: false,
      label: "Help & Support",
      icon: HeartHandshake,
    },
    {
      to: "/app/account",
      end: false,
      label: "Account Settings",
      icon: Settings,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f2ea] text-[#243b32] flex flex-col lg:flex-row antialiased selection:bg-[#cadcbd] selection:text-[#1a2c25]">
      {/* Mobile Top Navigation Bar */}
      <div className="lg:hidden sticky top-0 z-40 bg-[#fffefa]/95 backdrop-blur-md border-b border-[#e7e9df] px-4 py-3 flex items-center justify-between">
        <Link to="/app" className="flex items-center gap-2" title="CalmWind Sanctuary Home">
          <div className="w-8 h-8 rounded-xl bg-[#e3ebd9] grid place-items-center">
            <SproutLogo className="w-5 h-5" color="#355b44" />
          </div>
          <span className="font-serif text-lg font-medium text-[#243b32]">CalmWind</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#f4f6ee] border border-[#e4ebd9] py-1 px-2.5 rounded-full text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-[#52765a] animate-pulse"></span>
            <span className="text-[#355b44]">{user?.name?.split(" ")[0] || "Student"}</span>
          </div>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-[#355b44] hover:bg-[#eef2ea] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Backdrop */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/25 backdrop-blur-xs transition-opacity duration-200"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar (Desktop sticky & Mobile Slide-over) */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 shrink-0 bg-[#f9f8f4] border-r border-[#e7e9df] flex flex-col justify-between p-6 transition-transform duration-200 ease-out lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div>
          {/* Brand header - links to main home */}
          <div className="flex items-center justify-between pb-6 border-b border-[#eceee7]">
            <Link to="/app" className="flex items-center gap-3 group no-underline" title="Return to Sanctuary Home">
              <div className="w-9 h-9 rounded-xl bg-[#e3ebd9] grid place-items-center transition-transform group-hover:scale-105 duration-200">
                <SproutLogo className="w-5 h-5" color="#355b44" />
              </div>
              <div>
                <span className="font-serif text-xl font-medium tracking-tight text-[#243b32] block leading-tight">
                  CalmWind
                </span>
                <span className="text-[10px] uppercase tracking-[1.5px] font-semibold text-[#69836b]">
                  Student Sanctuary
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden text-[#7b827a] hover:text-[#243b32]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="mt-6 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-[#e5ecdc] text-[#1f3729] font-semibold border border-[#d2dec8] shadow-xs"
                        : "text-[#697268] hover:text-[#243b32] hover:bg-[#eff3ea]"
                    }`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Support Callout & User Profile */}
        <div className="space-y-4 pt-6 border-t border-[#eceee7]">
          {/* Urgent Support SOS Card */}
          <div className="p-4 rounded-2xl bg-[#fffefa] border border-[#ebdccb] shadow-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
              </span>
              <p className="text-xs font-semibold text-[#7a4c28]">Feeling overwhelmed?</p>
            </div>
            <p className="text-[11px] text-[#8c674b] leading-relaxed mb-3">
              Campus counselors and 24/7 crisis lines are here for you anytime.
            </p>
            <Link
              to="/app/support"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#c55d51] hover:bg-[#b04f44] text-white text-xs font-medium shadow-xs transition-colors duration-150"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>SOS & Helplines</span>
            </Link>
          </div>

          {/* User profile bar */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#355b44] text-[#fffefa] font-serif text-sm font-medium grid place-items-center shrink-0 border border-[#cadcbd]">
                {user?.name
                  ? user.name
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                  : "CW"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-[#243b32] truncate">
                  {user?.name || "Student"}
                </p>
                <p className="text-[10px] text-[#7b827a] truncate">
                  {user?.email || "student@campus.edu"}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              title="Logout"
              className="p-2 rounded-xl text-[#7b827a] hover:text-[#b04f44] hover:bg-[#faeae8] transition-colors disabled:opacity-50"
              aria-label="Log out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 lg:px-12 py-8 sm:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
