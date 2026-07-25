import axios from "axios";
import { appEnv } from "../config/env";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: appEnv.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Add interceptors (for token, errors, etc.)
axiosInstance.interceptors.request.use(
  (config) => {
    // Example: attach token dynamically
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response || error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
