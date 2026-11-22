import { apiRequest, storeTokens, clearTokens } from "./api";

export function normalizeUser(raw) {
  if (!raw) return null;
  return {
    id: raw._id || raw.id || "",
    fullName: raw.fullName || raw.name || "",
    name: raw.fullName || raw.name || "",
    username: raw.username || "",
    email: raw.email || "",
    avatar: raw.avatar || "",
    coverImage: raw.coverImage || "",
    createdAt: raw.createdAt || null,
    updatedAt: raw.updatedAt || null,
  };
}

export async function registerUser({ fullName, username, email, password, avatar, coverImage }) {
  const form = new FormData();
  form.append("fullName", fullName.trim());
  form.append("username", username.trim().toLowerCase());
  form.append("email", email.trim().toLowerCase());
  form.append("password", password);
  if (avatar) form.append("avatar", avatar);
  if (coverImage) form.append("coverImage", coverImage);

  const payload = await apiRequest("/users/register", {
    method: "POST",
    body: form,
    isFormData: true,
  });
  const data = payload?.data || {};
  storeTokens(data);
  return normalizeUser(data.user || data);
}

export async function loginUser({ identifier, password }) {
  const value = identifier.trim().toLowerCase();
  const body = value.includes("@")
    ? { email: value, password }
    : { username: value, password };

  const payload = await apiRequest("/users/login", { method: "POST", body });
  const data = payload?.data || {};
  storeTokens(data);
  return normalizeUser(data.user);
}

export async function logoutUser() {
  try {
    await apiRequest("/users/logout", { method: "POST", body: {} });
  } finally {
    clearTokens();
  }
}

export async function fetchCurrentUser() {
  const payload = await apiRequest("/users/current-user");
  return normalizeUser(payload?.data);
}

export async function updateAccount({ fullName, email }) {
  const payload = await apiRequest("/users/update-account", {
    method: "PATCH",
    body: { fullName: fullName.trim(), email: email.trim().toLowerCase() },
  });
  return normalizeUser(payload?.data);
}

export async function changePassword({ oldPassword, newPassword }) {
  const payload = await apiRequest("/users/change-password", {
    method: "POST",
    body: { oldPassword, newPassword },
  });
  return payload?.data;
}
