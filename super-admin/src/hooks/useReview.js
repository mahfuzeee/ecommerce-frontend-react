import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getAllReview,
  getReview,
  createReview,
  updateReview,
} from "../api/review.api";
import { SuccessToast } from "../helper/helper";

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

export const useCreateReview = () => {
  return useMutation({
    mutationFn: (data) => createReview(data),
    onSuccess: () => {
      SuccessToast("Review created successfully");
    },
  });
};

export const useUpdateReview = () => {
  return useMutation({
    mutationFn: (data) => updateReview(data),
  });
};
