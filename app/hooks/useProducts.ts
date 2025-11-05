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
        Authorization:
          "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU0NTEzMjA5OWFkNmJmNjEzODJiNmI0Y2RlOWEyZGZlZDhjYjMwZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2d0LXRlc3QtYXV0aCIsImF1ZCI6InNndC10ZXN0LWF1dGgiLCJhdXRoX3RpbWUiOjE3NjIzMTc2MTUsInVzZXJfaWQiOiJzeDlZYW9RMVNlVXV0MW1DWWY4NXNDelpvelgyIiwic3ViIjoic3g5WWFvUTFTZVV1dDFtQ1lmODVzQ3pab3pYMiIsImlhdCI6MTc2MjMxNzYxNSwiZXhwIjoxNzYyMzIxMjE1LCJlbWFpbCI6ImZhZGhpbGlzZmFkaGlsbGFoQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJmYWRoaWxpc2ZhZGhpbGxhaEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.czyz1ECUdBe2IolZ2S9KUNrviMVM57nmeg6c78v_9T09NUrUfj7OsY4Wc84gMx9kgyHAOehW5TElelrGKby5Ysxt7NfQRqD1ODFH7Di8kYcZnqNjTbBybEnYWvnj2wTVTzogquDsot7rFmLYjpLU2fh960396725IvTvWlfL91L1_uRVYsWCHumXhZ8wlhIrGXgG0HREq7e3we3Qn-hnCl9LM_U46nVauQUNdhKQwVIG-rhYLbYwu_w64VXc1UB12xm3BowUSm9Y3WRl_B_fdCFlWbxIkhBMuv7h4UbTmninWpUVAGIsliZXojQDnKJEaMapKrc8fVwiOrLDi7f4wQ",
      },
    },
  );

  return response.data;
};

const fetchProductById = async (
  id: string,
  token: string | null,
): Promise<GetProductIdResponse> => {
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
