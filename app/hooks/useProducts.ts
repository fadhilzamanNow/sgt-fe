import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../types/product";
import { useAuth } from "../context/AuthContext";

interface GetAllProductsParams {
  page: number;
  limit: number;
  search?: string;
}

interface GetAllProductsResponse {
  data: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

interface GetProductIdResponse {
  data: Product;
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

const fetchProducts = async (
  { page, limit, search }: GetAllProductsParams,
  token: string | null,
): Promise<GetAllProductsResponse> => {
  const response = await axios.get(
    `/api/products?page=${page}&limit=${limit}&q=${search || ""}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );

  return response.data;
};

const fetchProductById = async (
  id: string,
  token: string | null,
): Promise<GetProductIdResponse> => {
  console.log("fetchProductById - Token:", token); // Debug log

  if (!token) {
    console.error("No token available for fetchProductById");
    throw new Error("Authentication token is required");
  }

  const response = await axios.get(`/api/product?product_id=${id}`, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

const createProduct = async (
  product: any,
  token: string | null,
): Promise<Product> => {
  const response = await axios.post("/api/product", product, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

const editProduct = async (
  product: any,
  token: string | null,
): Promise<Product> => {
  const response = await axios.put("/api/product", product, {
    headers: {
      Authorization: token,
    },
  });

  return response.data;
};

export const useGetAllProducts = ({
  page,
  limit,
  search,
}: GetAllProductsParams) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["products", page, limit, search],
    queryFn: () => fetchProducts({ page, limit, search }, getToken()),
  });
};

export const useGetProductById = (id: string, enabled: boolean = true) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id, getToken()),
    enabled: enabled && !!id,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: (product: any) => createProduct(product, getToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: (product: any) => editProduct(product, getToken()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};
