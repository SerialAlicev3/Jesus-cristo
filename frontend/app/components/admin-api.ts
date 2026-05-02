"use client";

export const adminApiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api";

export function getAdminToken() {
  if (typeof window === "undefined") {
    return "";
  }

  return window.localStorage.getItem("admin_api_token") ?? "";
}

export function setAdminToken(token: string) {
  window.localStorage.setItem("admin_api_token", token);
  window.dispatchEvent(new CustomEvent("admintokenchange", { detail: token }));
}

export function clearAdminToken() {
  window.localStorage.removeItem("admin_api_token");
  window.dispatchEvent(new CustomEvent("admintokenchange", { detail: "" }));
}

export async function adminFetch<T>(path: string, options: RequestInit = {}) {
  const token = getAdminToken();
  const headers = new Headers(options.headers);

  headers.set("Content-Type", headers.get("Content-Type") ?? "application/json");
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${adminApiBaseUrl}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error((data && typeof data === "object" && "message" in data ? String(data.message) : "") || `API ${response.status}`);
  }

  return data as T;
}

export async function supabasePasswordLogin(email: string, password: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    throw new Error("NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY nao estao configurados.");
  }

  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    body: JSON.stringify({ email, password }),
    headers: {
      apikey: anonKey,
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description ?? data.msg ?? "Login falhou.");
  }

  setAdminToken(String(data.access_token));
  return data;
}
