// src/lib/firebaseAdmin.js
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function ensureApp() {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }
}

export function getAdminDb() {
  ensureApp();
  return getFirestore();
}

export async function verifyAdmin(request) {
  const header = request.headers.get("authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return null;
  try {
    ensureApp();
    const decoded = await getAuth().verifyIdToken(token);
    const snap = await getFirestore().collection("admins").doc(decoded.uid).get();
    return snap.exists ? decoded : null;
  } catch {
    return null;
  }
}