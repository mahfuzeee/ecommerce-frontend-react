import { useQuery } from "@tanstack/react-query";
import { getAllReview } from "../api/review.api";

export const useAllReview = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => getAllReview(),
  });
};

export const useSingleReview = (id) => {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => getReview({ id }),
  });
};
