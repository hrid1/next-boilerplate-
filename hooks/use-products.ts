import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import { CreateProductDto, UpdateProductDto } from "@/types/product";
import { toast } from "sonner";

export const productKeys = {
  all:    ["products"]               as const,
  detail: (id: string) => ["products", id] as const,
};

export function useProducts() {
  return useQuery({
    queryKey: productKeys.all,
    queryFn:  productService.getAll,
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn:  () => productService.getById(id),
    enabled:  !!id,
  });
}

export function useCreateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: productService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.all });
      toast.success("Product created");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Failed to create");
    },
  });
}

export function useUpdateProduct(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (body: UpdateProductDto) => productService.update(id, body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.all });
      qc.invalidateQueries({ queryKey: productKeys.detail(id) });
      toast.success("Product updated");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Failed to update");
    },
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: productService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: productKeys.all });
      toast.success("Product deleted");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message ?? "Failed to delete");
    },
  });
}