import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllReview,
  getReview,
  createReview,
  updateReview,
} from "../api/review.api";

export const useAllReview = () => {
  return useQuery({
    queryKey: ["reviews"],
    queryFn: () => getAllReview(),
  });
};

export const useSingleReview = (id) => {
  return useQuery({
    queryKey: ["review", id],
    queryFn: () => getReview(id),
  });
};

export const useCreateReview = (data) => {
  return useMutation({
    mutationFn: () => createReview(data),
  });
};

export const useUpdateReview = (id) => {
  return useMutation({
    mutationFn: () => updateReview(id),
  });
};
