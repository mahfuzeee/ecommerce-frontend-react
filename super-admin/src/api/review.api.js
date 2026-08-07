import { data } from "react-router-dom";
import { reviewApi } from "../helper/api";

export const getAllReview = async () => {
  const res = await reviewApi.get("/all");
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
