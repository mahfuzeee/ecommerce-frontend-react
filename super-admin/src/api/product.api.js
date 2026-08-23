import { productApi } from "../helper/api";

export const getAllProduct = async (params = {}) => {
  const {
    page = "",
    limit = "",
    brand_id = "",
    category_id = "",
    keyword = "",
  } = params;
  const res = await productApi.get("/", {
    params: {
      page,
      limit,
      brand_id,
      category_id,
      keyword,
    },
  });
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};

export const getProduct = async (id) => {
  const res = await productApi.get(`/${id}`);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};

export const deleteProduct = async ({ id }) => {
  const res = await productApi.delete(`/${id}`);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};

//Create product api
export const createProduct = async (data) => {
  const res = await productApi.post("/", data);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};

//Update product api
export const updateProduct = async ({ id, data }) => {
  const res = await productApi.put(`/${id}`, data);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};
