import { brandApi } from "../helper/api";

export const getAllBrand = async (params = {}) => {
  const { page = "", limit = "" } = params;
  const res = await brandApi.get("/", {
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

export const createBrand = async (data) => {
  const res = await brandApi.post("/", data);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};

export const getBrand = async (id) => {
  const res = await brandApi.get(`/${id}`);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};

export const updateBrand = async ({ id, data }) => {
  const res = await brandApi.put(`/${id}`, data);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};

export const deleteBrand = async ({ id }) => {
  const res = await brandApi.delete(`/${id}`);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};
