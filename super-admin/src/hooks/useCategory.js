import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllCategory,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
} from "../api/category.api";

import { SuccessToast } from "../helper/helper";

export const useGetAllCategory = (pagination) => {
  return useQuery({
    queryKey: ["categories", pagination],
    queryFn: () => getAllCategory(pagination),
    keepPreviousData: true,
  });
};

//Get category by id hook
export const useGetCategory = (id) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
    enabled: !!id,
  });
};

//Create category hook
export const useCreateCategory = () => {
  return useMutation({
    mutationFn: (data) => createCategory(data),
    onSuccess: () => {
      SuccessToast("Category created successfully");
    },
  });
};
