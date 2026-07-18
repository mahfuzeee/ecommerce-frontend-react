import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
const baseURLFile = import.meta.env.VITE_BASE_URL_FILE;

export const userApi = axios.create({
  baseURL: `${baseURL}/user`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//Brand api
export const brandApi = axios.create({
  baseURL: `${baseURL}/brands`,
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
