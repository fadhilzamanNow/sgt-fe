"use client";
import { PlusOutlined } from "@ant-design/icons";
import { Flex, Typography, Select, Input, Space, Button } from "antd";
import TablePagination from "../components/TablePagination";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
const { Title, Text } = Typography;
const { Search } = Input;
import { type Product } from "../types/product";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [total, setTotal] = useState(0);
  const firstElement = useMemo(() => page * limit - limit + 1, [limit, page]);
  const lastElement = useMemo(
    () => page * limit - (limit - products.length),
    [products, page, limit],
  );
  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get("/api/products", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const newProducts = response.data.data.map(
        (item: Product, ind: number) => ({
          ...item,
          id: ind + 1,
        }),
      );
      setProducts(newProducts);
      setTotal(response.data.pagination.total);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Flex className="h-full" vertical gap={12}>
      <Title level={2}>Product Management</Title>
      <Flex justify="space-between" align="center">
        <Space size={10}>
          <Select
            placeholder="Select product based on category"
            className="!min-w-[320px]"
            options={[
              { value: "product1", label: "Product 1" },
              { value: "product2", label: "Product 2" },
              { value: "product3", label: "Product 3" },
            ]}
          />
          <Search
            placeholder="Search product based on product name"
            style={{ minWidth: 320 }}
          />
          <Search
            placeholder="Search product based on category name"
            style={{ minWidth: 320 }}
          />
        </Space>
        <Button type="primary">
          <PlusOutlined />
          <span className="border-none flex items-center">Add Product</span>
        </Button>
      </Flex>
      <Flex justify="space-between" align="center" vertical={false}>
        <Select
          placeholder="Select product based on category"
          defaultValue={5}
          onSelect={(val) => setLimit(val)}
          options={[
            { value: 5, label: "5" },
            { value: 10, label: "10" },
            { value: 20, label: "20" },
            { value: 30, label: "30" },
            { value: 40, label: "40" },
            { value: 50, label: "50" },
          ]}
        />
        <Space direction="horizontal" size={4}>
          <Text>Menampilkan </Text>
          <Text strong>{firstElement}</Text>
          <Text>sampai</Text>
          <Text strong>{lastElement}</Text>
          <Text>dari</Text>
          <Text strong>{total}</Text>
          <Text>entri</Text>
        </Space>
      </Flex>
      <TablePagination products={products} page={page} limit={limit} />
    </Flex>
  );
}
