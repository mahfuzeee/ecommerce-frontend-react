import { getAllBrand } from "../api/brand.api";
import { useQuery } from "@tanstack/react-query";
const useBrand = (pagination) => {
  return useQuery({
    queryKey: ["brand", pagination],
    queryFn: () => getAllBrand(pagination),
    keepPreviousData: true,
  });
};

export default useBrand;
