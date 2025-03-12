import axios from "axios";
import { toast } from "react-toastify";
import { getSessionData } from "./SharedSessionData";
import { useState, useEffect } from "react";

const createAxiosInstance = (baseURL) => {
  const api = axios.create({
    baseURL: baseURL,
  });
  const token = sessionStorage.getItem("token");
  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
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
        localStorage.removeItem("token");
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
