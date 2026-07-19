import { productApi } from "../helper/api";

export const getAllProduct = async ({ page, limit }) => {
  const res = await productApi.get("/", {
    params: {
      page,
      limit,
    },
  });
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};

export const getProduct = async ({ id }) => {
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
