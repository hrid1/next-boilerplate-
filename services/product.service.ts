import api from "@/lib/axios";
import { Product, CreateProductDto, UpdateProductDto } from "@/types/product";

export const productService = {
  getAll: async (): Promise<Product[]> => {
    const { data } = await api.get("/products");
    return data;
  },

  getById: async (id: string): Promise<Product> => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  },

  create: async (body: CreateProductDto): Promise<Product> => {
    const { data } = await api.post("/products", body);
    return data;
  },

  update: async (id: string, body: UpdateProductDto): Promise<Product> => {
    const { data } = await api.patch(`/products/${id}`, body);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/products/${id}`);
  },
};
