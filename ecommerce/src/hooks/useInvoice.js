import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAllInvoice,
  createInvoice,
  getSingleInvoice,
  getInvoiceProduct,
  deleteInvoice,
  updateInvoice,
  getInvoiceById,
} from "../api/invoice.api";

//Get all invoice by single user
export const useAllInvoice = () => {
  return useQuery({
    queryKey: ["invoices"],
    queryFn: () => getAllInvoice(),
  });
};

//Create invoice
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices"]);
    },
  });
};

//Get sinlge invoice by single user
export const useSingleInvoice = (id) => {
  return useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getSingleInvoice(id),
  });
};

//Get invoice product list
export const useInvoiceProduct = () => {
  return useQuery({
    queryKey: ["invoice-product"],
    queryFn: () => getInvoiceProduct(),
  });
};

//Get invoice by id
export const useInvoiceById = (id) => {
  return useQuery({
    queryKey: ["invoice", id],
    queryFn: () => getInvoiceById(id),
  });
};

//Delete invoice
export const useDeleteInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices"]);
    },
  });
};

//update invoice
export const useUpdateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateInvoice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["invoices"]);
    },
  });
};
