import { categoryApi } from "../helper/api";

export const getAllCategory = async (params = {}) => {
  const { page = "", limit = "" } = params;
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

//Get category by id
export const getCategory = async (id) => {
  const res = await categoryApi.get(`/${id}`);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};

//Create category
export const createCategory = async (data) => {
  const res = await categoryApi.post("/create", data);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};

//Update category
export const updateCategory = async ({ id, data }) => {
  const res = await categoryApi.put(`/${id}`, data);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};

//Delete category
export const deleteCategory = async ({ id }) => {
  const res = await categoryApi.delete(`/${id}`);
  if (res?.data?.success === true) {
    return res?.data?.data;
  } else {
    return [];
  }
};
