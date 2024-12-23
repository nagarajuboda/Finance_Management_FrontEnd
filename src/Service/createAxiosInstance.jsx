import axios from "axios";
import { toast } from "react-toastify";

const createAxiosInstance = (baseURL, loaderContext) => {
  const api = axios.create({
    baseURL: baseURL,
  });

  api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.data.code) {
        return toast.error(error.response.data.errors);
      } else {
        return toast.error(error.message);
      }
    }
  );

  return api;
};

const apiurl = createAxiosInstance("https://localhost:44305/api");
export { apiurl };
