import axios from "axios";
import { appEnv } from "../config/env";

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: appEnv.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response || error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
