import axios from "axios";

// Set your backend base URL
const BASE_URL =
  import.meta.env.VITE_API_URL || "https://happypawsbd-server.onrender.com";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: BASE_URL,
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
