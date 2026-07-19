import { reviewApi } from "../helper/api";

export const getAllReview = async () => {
  const res = await reviewApi.get("/");
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};

export const getReview = async ({ id }) => {
  const res = await reviewApi.get(`/${id}`);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};
