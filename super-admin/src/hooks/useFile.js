import { useMutation, useQuery } from "@tanstack/react-query";
import { uploadFile } from "../api/file.api";
import { SuccessToast } from "../helper/helper";

export const useUploadFile = () => {
  return useMutation({
    mutationFn: (data) => uploadFile(data),
    onSuccess: SuccessToast("File uploaded successfully"),
  });
};

export const useGetAllFile = () => {
  return useQuery({
    queryKey: ["files"],
    queryFn: () => getAllFile(),
  });
};

export const useDeleteFile = () => {
  return useMutation({
    mutationFn: (data) => deleteFile(data),
    onSuccess: SuccessToast("File deleted successfully"),
  });
};
