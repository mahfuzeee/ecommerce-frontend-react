import { brandApi } from "../helper/api";

export const getAllBrand = async ({ page, limit }) => {
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
