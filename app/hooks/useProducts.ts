import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "../types/product";

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

const fetchProducts = async ({
  page,
  limit,
  search,
}: GetAllProductsParams): Promise<GetAllProductsResponse> => {
  const token = localStorage.getItem("token");
  const response = await axios.get(
    `/api/products?page=${page}&limit=${limit}&q=${search || ""}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const useGetAllProducts = ({
  page,
  limit,
  search,
}: GetAllProductsParams) => {
  return useQuery({
    queryKey: ["products", page, limit, search],
    queryFn: () => fetchProducts({ page, limit, search }),
  });
};
