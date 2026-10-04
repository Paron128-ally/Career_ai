export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export function saveSession(data) {
  localStorage.setItem("careerai_access_token", data.access_token);
  localStorage.setItem("careerai_refresh_token", data.refresh_token);
  localStorage.setItem("careerai_user", JSON.stringify(data.user || {}));
}

export function getAccessToken() {
  return localStorage.getItem("careerai_access_token");
}

export async function api(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const token = getAccessToken();
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers,
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok) {
    const detail = payload.detail;
    const message = typeof detail === "string" ? detail : JSON.stringify(detail || payload);
    throw new Error(message || `Request failed (${res.status})`);
  }
  return payload;
}
