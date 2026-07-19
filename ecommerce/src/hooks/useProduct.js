import { useQuery } from "@tanstack/react-query";
import { getAllProduct, getProduct } from "../api/product.api";

export const useProduct = (pagination) => {
  return useQuery({
    queryKey: ["products", pagination],
    queryFn: () => getAllProduct(pagination),
    keepPreviousData: true,
  });
};

export const useSingleProduct = (id) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProduct({ id }),
  });
};
