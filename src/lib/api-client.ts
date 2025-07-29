import axios from "axios";

/**
 * API client for backend communication
 * @description Axios instance configured for the NestJS backend
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout
});

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    console.log(
      `Making ${config.method?.toUpperCase()} request to ${config.url}`
    );
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Network Error: No response from server");
    } else {
      // Something else happened
      console.error("Request Error:", error.message);
    }
    return Promise.reject(error);
  }
);
