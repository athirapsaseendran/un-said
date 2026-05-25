import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCT8ZLCPGFYvTl3xlrultPqTRTWz1Kp0BY",
  authDomain: "un-said-c31fb.firebaseapp.com",
  projectId: "un-said-c31fb",
  storageBucket: "un-said-c31fb.firebasestorage.app",
  messagingSenderId: "738697660896",
  appId: "1:738697660896:web:4439646664dae9fd3ec385",
  measurementId: "G-HVE074Z0PF"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)