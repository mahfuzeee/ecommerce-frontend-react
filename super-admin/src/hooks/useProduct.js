import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from "../api/product.api";
import { ErrorToast, SuccessToast } from "../helper/helper";

export const useAllProduct = (filter) => {
  const { page, limit, brand_id, category_id, keyword } = filter;
  return useQuery({
    queryKey: ["products", page, limit, brand_id, category_id, keyword],
    queryFn: () => getAllProduct(filter),
    keepPreviousData: true,
  });
};

export const useSingleProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct(id),
    enabled: !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      SuccessToast("Product created successfully");
    },
    onError: (error) => {
      ErrorToast(error?.response?.data?.message || "Failed to create product");
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => deleteProduct({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      SuccessToast("Product deleted successfully");
    },
    onError: (error) => {
      ErrorToast(error?.response?.data?.message || "Failed to delete product");
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateProduct({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      queryClient.invalidateQueries(["product"]);
      SuccessToast("Product updated successfully");
    },
    onError: (error) => {
      ErrorToast(error?.response?.data?.message || "Failed to update product");
    },
  });
};
