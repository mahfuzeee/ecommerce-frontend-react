import { useMutation, useQuery, queryClient } from "@tanstack/react-query";
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
export const useCreateInvoice = (data) => {
  return useMutation({
    mutationFn: () => createInvoice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
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
export const useDeleteInvoice = (id) => {
  return useMutation({
    mutationFn: () => deleteInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
    },
  });
};

//update invoice
export const useUpdateInvoice = (id, data) => {
  return useMutation({
    mutationFn: () => updateInvoice(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invoices"],
      });
    },
  });
};
