import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api/v1";
const baseURLFile = import.meta.env.VITE_BASE_URL_FILE;

export const userApi = axios.create({
  baseURL: `${baseURL}/user`,
});

//Brand api
export const brandApi = axios.create({
  baseURL: `${baseURL}/brands`,
  withCredentials: true,
});

//Category api
export const categoryApi = axios.create({
  baseURL: `${baseURL}/categories`,
});

//Product api
export const productApi = axios.create({
  baseURL: `${baseURL}/products`,
});

//file api
export const apiFile = axios.create({
  baseURL: baseURLFile,
  headers: {
    "Content-Type": "application/json",
  },
});
