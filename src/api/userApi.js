import { useAuthStore } from "../store/store";


export async function getProfile() {
  const token = useAuthStore.getState().token;

  const res = await fetch("https://dummyjson.com/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // ✅ JWT used here
    },
  });

  if (!res.ok) {
    throw new Error("Unauthorized");
  }

  return res.json();
}
