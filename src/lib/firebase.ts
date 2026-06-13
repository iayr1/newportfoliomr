import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB-Jn_3ayV5SQ80Kafm1aqDhu_yyWzsAlY",
  authDomain: "portfolio-44af5.firebaseapp.com",
  projectId: "portfolio-44af5",
  storageBucket: "portfolio-44af5.firebasestorage.app",
  messagingSenderId: "915326535800",
  appId: "1:915326535800:web:5818df6a6b15863a8a058d",
  measurementId: "G-EHBV0QNX98",
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export const ADMIN_EMAIL = "mayuraimaker@gmail.com";
export const CLARITY_PROJECT_ID = "x6drraa6yi";
