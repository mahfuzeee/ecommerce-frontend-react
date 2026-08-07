import { getAllBrand } from "../api/brand.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createBrand } from "../api/brand.api";
import { SuccessToast, ErrorToast } from "../helper/helper";
export const useGetAllBrand = (pagination) => {
  return useQuery({
    queryKey: ["brands", pagination],
    queryFn: () => getAllBrand(pagination),
    keepPreviousData: true,
  });
};

export const useCreateBrand = (data) => {
  return useMutation({
    mutationFn: () => createBrand(data),
    onSuccess: () => {
      SuccessToast("Brand created successfully");
    },
    onError: (error) => {
      ErrorToast(error?.response?.data?.message);
    },
  });
};

//Get a single brand
export const useGetBrand = (id) => {
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
