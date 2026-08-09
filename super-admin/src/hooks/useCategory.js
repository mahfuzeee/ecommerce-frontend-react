import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
export const useSingleCategory = (id) => {
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

//Update a category
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateCategory({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      SuccessToast("Category updated successfully");
    },
  });
};

//Delete a category
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"]);
      SuccessToast("Category deleted successfully");
    },
  });
};
