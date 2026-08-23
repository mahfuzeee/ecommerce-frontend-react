import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { uploadFile, getAllFile, deleteFile } from "../api/file.api";
import { SuccessToast } from "../helper/helper";

//Upload a file hook
export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => uploadFile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      SuccessToast("File uploaded successfully");
    },
  });
};

//Get all files hooks
export const useGetAllFile = (filter) => {
  return useQuery({
    queryKey: ["files", filter],
    queryFn: () => getAllFile(filter),
  });
};

export const useDeleteFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => deleteFile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["files"] });
      SuccessToast("File deleted successfully");
    },
  });
};
