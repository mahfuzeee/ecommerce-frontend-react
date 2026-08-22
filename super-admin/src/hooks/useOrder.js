import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllOrder, exportOrder, updateOrder } from "../api/order.api";

export const useAllOrder = (query) => {
  const { data, isLoading } = useQuery({
    queryKey: ["orders", query],
    queryFn: () => getAllOrder(query),
  });
  return { data, isLoading };
};

export const useExportOrder = (params) => {
  return useQuery({
    queryKey: ["export-order", params],
    queryFn: () => exportOrder(params),
    enabled: false,
  });
};

//Update order hooks
export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ _id, user_id, delivery_status }) =>
      updateOrder({ _id, user_id, delivery_status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
