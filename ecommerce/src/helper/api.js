import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api/v1";
const baseURLFile = import.meta.env.VITE_BASE_URL_FILE;

axios.defaults.withCredentials = true; //for cookie

//User api
export const userApi = axios.create({
  baseURL: `${baseURL}/user`,
});

//Brand api
export const brandApi = axios.create({
  baseURL: `${baseURL}/brands`,
});

//Category api
export const categoryApi = axios.create({
  baseURL: `${baseURL}/categories`,
});

//Product api
export const productApi = axios.create({
  baseURL: `${baseURL}/products`,
});

//review api
export const reviewApi = axios.create({
  baseURL: `${baseURL}/reviews`,
});

//order api
export const orderApi = axios.create({
  baseURL: `${baseURL}/orders`,
});

//cart api
export const cartApi = axios.create({
  baseURL: `${baseURL}/cart`,
});

//invoice api
export const invoiceApi = axios.create({
  baseURL: `${baseURL}/invoices`,
});

//file api
export const apiFile = axios.create({
  baseURL: baseURLFile,
  headers: {
    "Content-Type": "application/json",
  },
});
