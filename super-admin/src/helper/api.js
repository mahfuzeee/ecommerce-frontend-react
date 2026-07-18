import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const baseURLFile = import.meta.env.VITE_BASE_URL_FILE;

export const adminApi = axios.create({
  baseURL: `${baseURL}/admin`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiFile = axios.create({
  baseURL: baseURLFile,
  headers: {
    "Content-Type": "application/json",
  },
});
