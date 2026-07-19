import { invoiceApi } from "../helper/api";
import { ErrorToast, SuccessToast } from "../helper/helper";

//Get all invoice by single user
export const getAllInvoice = async () => {
  try {
    const res = await invoiceApi.get("/all");
    if (res?.data?.success === true) {
      SuccessToast(res?.data?.message);
      return res?.data?.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch invoices", error);
    ErrorToast(res?.data?.message);
    return [];
  }
};

//Create invoice
export const createInvoice = async (data) => {
  try {
    const res = await invoiceApi.post("/", data);
    if (res?.data?.success === true) {
      return res?.data?.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to create invoice", error);
    return [];
  }
};

//Get single invoice by single user
export const getSingleInvoice = async ({ id }) => {
  try {
    const res = await invoiceApi.get(`/single/${id}`);
    if (res?.data?.success === true) {
      return res?.data?.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch invoice", error);
    return [];
  }
};

//Get invoice product list
export const getInvoiceProduct = async () => {
  try {
    const res = await invoiceApi.get(`/invoice-product-list`);
    if (res?.data?.success === true) {
      return res?.data?.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch invoice", error);
    return [];
  }
};

//Get invoice by id
export const getInvoiceById = async ({ id }) => {
  try {
    const res = await invoiceApi.get(`/${id}`);
    if (res?.data?.success === true) {
      return res?.data?.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch invoice", error);
    return [];
  }
};

//Delete invoice
export const deleteInvoice = async ({ id }) => {
  try {
    const res = await invoiceApi.delete(`/${id}`);
    if (res?.data?.success === true) {
      return res?.data?.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to delete invoice", error);
    return [];
  }
};

//update invoice
export const updateInvoice = async ({ id, data }) => {
  try {
    const res = await invoiceApi.put(`/${id}`, data);
    if (res?.data?.success === true) {
      return res?.data?.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to update invoice", error);
    return [];
  }
};
