import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../api/category.api";

const useCategory = (pagination) => {
  return useQuery({
    queryKey: ["category", pagination],
    queryFn: () => getCategory(pagination),
    keepPreviousData: true,
  });
};

export default useCategory;
