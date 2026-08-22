import { orderApi } from "../helper/api";
import { SuccessToast, ErrorToast } from "../helper/helper";

export const getAllOrder = async (query = {}) => {
  try {
    const { page = "", limit = "" } = query;
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;
    const res = await orderApi.get("/", {
      params: {
        page: pageNumber,
        limit: limitNumber,
      },
    });
    if (res?.data?.success === true) {
      SuccessToast(res?.data?.message);
      return res?.data?.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to fetch orders", error);
    ErrorToast(error?.response?.data?.message);
    return [];
  }
};

export const exportOrder = async (params = {}) => {
  try {
    const { from = "", to = "" } = params;
    const res = await orderApi.get("/export-csv", {
      params: {
        from,
        to,
      },
      responseType: "blob",
    });
    if (res) {
      SuccessToast("Orders exported successfully");
    }
    return res.data;
  } catch (error) {
    console.error("Failed to export orders", error);
    ErrorToast(error?.response?.data?.message);
    return [];
  }
};

export const updateOrder = async (data) => {
  try {
    const res = await orderApi.put("/update", data);
    if (res?.data?.success === true) {
      SuccessToast(res?.data?.message);
      return res?.data?.data;
    }
    return [];
  } catch (error) {
    console.error("Failed to update order", error);
    ErrorToast(error?.response?.data?.message);
    return [];
  }
};

export const deleteOrder = async (id) => await orderApi.delete(`/${id}`);
