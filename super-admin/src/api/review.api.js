import { reviewApi } from "../helper/api";

export const getAllReview = async (query = {}) => {
  const { page = "", limit = "" } = query;
  const res = await reviewApi.get("/all", {
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

export const getReview = async (id) => {
  const res = await reviewApi.get(`/product/${id}`);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};

export const createReview = async (data) => {
  const res = await reviewApi.post("/", data);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};

export const updateReview = async (id) => {
  const res = await reviewApi.put(`/${id}`);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};
