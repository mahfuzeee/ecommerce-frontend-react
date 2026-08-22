import { useQuery } from "@tanstack/react-query";
import { getAllOrder, exportOrder } from "../api/order.api";

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
