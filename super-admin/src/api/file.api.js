import { apiFile } from "../helper/api";

//Upload a file api
export const uploadFile = async (data) => await apiFile.post("/upload", data);

//Get all file api
export const getAllFile = async () => await apiFile.get("/all");

//Delete file api
export const deleteFile = async (data) => await apiFile.delete("/delete", data);
