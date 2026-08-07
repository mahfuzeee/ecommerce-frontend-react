import { useQuery } from "@tanstack/react-query";
import { getAllProduct, getProduct } from "../api/product.api";

const useProduct = (filter) => {
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
  });
};

export default useProduct;
