import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { appEnv } from "./config/env";

// Initialize Firebase
const app = initializeApp(appEnv.firebase);
export const auth = getAuth(app);
export default app;
