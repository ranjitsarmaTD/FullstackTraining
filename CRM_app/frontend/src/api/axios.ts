import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Session expired. Redirecting to login.");
      alert("Session expired. Please log in again.");
      localStorage.clear();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);