import { apiFile } from "../helper/api";

//Upload a file api
export const uploadFile = async (files) => {
  const formData = new FormData();
  formData.append("file", files);
  return await apiFile.post("/upload", formData, { withCredentials: true });
};

//Get all file api
export const getAllFile = async (filter = {}) => {
  const { page = "", limit = "" } = filter;
  return await apiFile.get("/all", {
    params: {
      page,
      limit,
    },
  });
};
//Delete file api
export const deleteFile = async (data) => await apiFile.post("/delete", data);
