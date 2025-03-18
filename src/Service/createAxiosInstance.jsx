import axios from "axios";
import { toast } from "react-toastify";

const createAxiosInstance = (baseURL) => {
  const api = axios.create({
    baseURL: baseURL,
  });

  api.interceptors.request.use(
    (config) => {
      const sessionData = localStorage.getItem("sessionData");
      const userDetails = sessionData ? JSON.parse(sessionData) : null;

      if (userDetails?.token) {
        config.headers["Authorization"] = `Bearer ${userDetails.token}`;
        //  console.log(" Token Attached:", userDetails.token);
      } else {
        console.warn("⚠️ No token found in sessionData");
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (!error.response) {
        toast.error("Network error. Please check your connection.");
        return Promise.reject(error);
      }

      const { data, status } = error.response;
      if (status === 401) {
        toast.error("Unauthorized! Please log in again.");
        localStorage.removeItem("sessionData");
        window.location.href = "/login";
      } else {
        const errorMessage =
          data?.errors && Array.isArray(data.errors)
            ? data.errors.join(", ")
            : data?.message || "An unexpected error occurred";

        toast.error(errorMessage);
      }

      return Promise.reject(error);
    }
  );

  return api;
};

const apiurl = createAxiosInstance("https://localhost:44305/api");

export { apiurl };
