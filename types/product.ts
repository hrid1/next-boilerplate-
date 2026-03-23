export type Product = {
  id:       string;
  name:     string;
  price:    number;
  stock:    number;
  category: string;
  status:   "active" | "inactive";
};

export type CreateProductDto = Omit<Product, "id">;
export type UpdateProductDto = Partial<CreateProductDto>;