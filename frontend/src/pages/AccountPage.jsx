import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, LogOut, Shield, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function AccountPage() {
  const { user, updateAccount, changePassword, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });
  const [profileMessage, setProfileMessage] = useState("");
  const [profileError, setProfileError] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [passwords, setPasswords] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  async function handleProfileSubmit(event) {
    event.preventDefault();
    setProfileMessage("");
    setProfileError("");
    if (!profile.fullName.trim() || !profile.email.trim()) {
      setProfileError("Full name and email are required.");
      return;
    }
    setIsSavingProfile(true);
    try {
      await updateAccount(profile);
      setProfileMessage("Account details updated.");
    } catch (err) {
      setProfileError(err?.message || "Could not update account details.");
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function handlePasswordSubmit(event) {
    event.preventDefault();
    setPasswordMessage("");
    setPasswordError("");
    if (!passwords.oldPassword || !passwords.newPassword) {
      setPasswordError("Both old password and new password are required.");
      return;
    }
    if (passwords.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setPasswordError("New password and confirm password do not match.");
      return;
    }
    setIsSavingPassword(true);
    try {
      await changePassword({
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
      });
      setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      setPasswordMessage("Password changed successfully.");
    } catch (err) {
      setPasswordError(err?.message || "Could not change password.");
    } finally {
      setIsSavingPassword(false);
    }
  }

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  const inputClass =
    "h-11 w-full rounded-xl border border-[#dfe4d9] bg-white px-3.5 text-sm text-[#243b32] outline-none transition-all placeholder:text-[#a5aaa2] focus:border-[#62866b] focus:ring-3 focus:ring-[#62866b]/10";

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="pb-4 border-b border-[#eceee7]">
        <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#243b32]">
          Account Settings
        </h1>
        <p className="mt-1 text-sm text-[#7b827a]">
          Manage the account connected to the CalmWind backend.
        </p>
      </div>

      <section className="rounded-[24px] border border-[#e7e9df] bg-[#fffefa] p-6 shadow-xs">
        <div className="flex items-center gap-4">
          {user?.avatar && !user.avatar.includes("via.placeholder.com") ? (
            <img
              src={user.avatar}
              alt=""
              className="h-14 w-14 rounded-full border border-[#cadcbd] object-cover"
            />
          ) : (
            <div className="grid h-14 w-14 place-items-center rounded-full bg-[#355b44] font-serif text-lg font-medium text-[#fffefa]">
              {user?.fullName
                ? user.fullName.split(" ").map((n) => n[0]).slice(0, 2).join("")
                : "CW"}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate font-serif text-xl text-[#243b32]">{user?.fullName || "Student"}</p>
            <p className="truncate text-sm text-[#7b827a]">{user?.email}</p>
            <p className="text-xs text-[#69836b]">@{user?.username}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[24px] border border-[#e7e9df] bg-[#fffefa] p-6 shadow-xs">
        <h2 className="flex items-center gap-2 font-serif text-xl text-[#243b32]">
          <UserRound className="h-5 w-5 text-[#355b44]" /> Profile details
        </h2>
        <p className="mt-1 text-xs text-[#7b827a]">Updates full name and email via PATCH /users/update-account.</p>
        <form onSubmit={handleProfileSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="account-fullName" className="mb-1 block text-xs font-semibold">Full name</label>
            <input
              id="account-fullName"
              value={profile.fullName}
              onChange={(e) => setProfile((p) => ({ ...p, fullName: e.target.value }))}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="account-email" className="mb-1 block text-xs font-semibold">Email address</label>
            <input
              id="account-email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              className={inputClass}
              required
            />
          </div>
          <button type="submit" disabled={isSavingProfile} className="btn-primary px-5 py-2.5 text-sm disabled:opacity-60">
            {isSavingProfile ? "Saving..." : "Save changes"}
          </button>
          {profileMessage && (
            <p className="flex items-center gap-2 text-xs font-medium text-[#355b44]" role="status">
              <CheckCircle className="h-4 w-4" /> {profileMessage}
            </p>
          )}
          {profileError && (
            <p className="rounded-xl border border-[#f5d0cc] bg-[#fbeeed] px-3 py-2 text-xs font-medium text-[#8e3c35]" role="alert">
              {profileError}
            </p>
          )}
        </form>
      </section>

      <section className="rounded-[24px] border border-[#e7e9df] bg-[#fffefa] p-6 shadow-xs">
        <h2 className="flex items-center gap-2 font-serif text-xl text-[#243b32]">
          <Shield className="h-5 w-5 text-[#355b44]" /> Change password
        </h2>
        <p className="mt-1 text-xs text-[#7b827a]">Uses POST /users/change-password. The backend has no forgot-password reset endpoint.</p>
        <form onSubmit={handlePasswordSubmit} className="mt-5 space-y-4">
          <div>
            <label htmlFor="oldPassword" className="mb-1 block text-xs font-semibold">Current password</label>
            <input
              id="oldPassword"
              type="password"
              autoComplete="current-password"
              value={passwords.oldPassword}
              onChange={(e) => setPasswords((p) => ({ ...p, oldPassword: e.target.value }))}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="mb-1 block text-xs font-semibold">New password</label>
            <input
              id="newPassword"
              type="password"
              autoComplete="new-password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords((p) => ({ ...p, newPassword: e.target.value }))}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmNewPassword" className="mb-1 block text-xs font-semibold">Confirm new password</label>
            <input
              id="confirmNewPassword"
              type="password"
              autoComplete="new-password"
              value={passwords.confirmPassword}
              onChange={(e) => setPasswords((p) => ({ ...p, confirmPassword: e.target.value }))}
              className={inputClass}
              required
            />
          </div>
          <button type="submit" disabled={isSavingPassword} className="btn-primary px-5 py-2.5 text-sm disabled:opacity-60">
            {isSavingPassword ? "Changing..." : "Change password"}
          </button>
          {passwordMessage && (
            <p className="flex items-center gap-2 text-xs font-medium text-[#355b44]" role="status">
              <CheckCircle className="h-4 w-4" /> {passwordMessage}
            </p>
          )}
          {passwordError && (
            <p className="rounded-xl border border-[#f5d0cc] bg-[#fbeeed] px-3 py-2 text-xs font-medium text-[#8e3c35]" role="alert">
              {passwordError}
            </p>
          )}
        </form>
      </section>

      <section className="rounded-[24px] border border-[#f5d0cc] bg-[#fffefa] p-6 shadow-xs">
        <h2 className="font-serif text-xl text-[#8e3c35]">Session</h2>
        <p className="mt-1 text-xs text-[#7b827a]">Logout calls POST /users/logout and clears the local session tokens.</p>
        <button onClick={handleLogout} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#b04f44] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#993e34]">
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </section>
    </div>
  );
}
