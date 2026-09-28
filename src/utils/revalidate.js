// src/utils/revalidate.js
// Update to support an optional tags parameter:
import { auth } from "@/lib/firebase";

export async function triggerRevalidation(paths, tags = ["search-index"]) {
  try {
    const token = await auth.currentUser?.getIdToken();
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ paths, tags }),
    });
  } catch (error) {
    console.error("Failed to trigger revalidation:", error);
  }
}