import { categoryApi } from "../helper/api";

export const getCategory = async ({ page, limit }) => {
  const res = await categoryApi.get("/", {
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
