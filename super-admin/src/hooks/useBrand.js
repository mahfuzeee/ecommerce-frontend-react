import {
  createBrand,
  updateBrand,
  getBrand,
  deleteBrand,
  getAllBrand,
} from "../api/brand.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SuccessToast, ErrorToast } from "../helper/helper";
export const useGetAllBrand = (pagination) => {
  return useQuery({
    queryKey: ["brands", pagination],
    queryFn: () => getAllBrand(pagination),
    keepPreviousData: true,
  });
};

//Create a new brand
export const useCreateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createBrand(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["brands"]);
      SuccessToast("Brand created successfully");
    },
    onError: (error) => {
      ErrorToast(error?.response?.data?.message);
    },
  });
};

//Get a single brand
export const useSingleBrand = (id) => {
  return useQuery({
    queryKey: ["brand", id],
    queryFn: () => getBrand(id),
    enabled: !!id,
  });
};

//update brand
export const useUpdateBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateBrand({ id, data }),
    onSuccess: () => {
      queryClient.invalidateQueries(["brand"]);
      SuccessToast("Brand updated successfully");
    },
  });
};

//Delete a brand hooks
export const useDeleteBrand = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteBrand(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["brands"]);
      SuccessToast(response?.data?.message || "Brand deleted successfully");
    },
  });
};
