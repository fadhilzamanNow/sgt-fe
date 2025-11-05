"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Flex, Typography, Select, Input, Space, Button } from "antd";
import TablePagination from "../components/TablePagination";
import { useEffect, useMemo, useState } from "react";
const { Title, Text } = Typography;
const { Search } = Input;
import { debounce } from "../utils/utils";
import { useGetAllProducts } from "../hooks/useProducts";
import DetailModal from "../components/DetailModal";
import CreateModal from "../components/CreateModal";
import EditModal from "../components/EditModal";

export default function Page() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const { data, isLoading, error } = useGetAllProducts({ page, limit, search });

  const products = useMemo(
    () =>
      data?.data.map((item, ind) => ({
        ...item,
        id:
          data.pagination.page * data.pagination.limit +
          1 -
          (data.data.length - ind),
      })) || [],
    [data],
  );
  const total = data?.pagination.total || 0;
  const firstElement = useMemo(() => page * limit - limit + 1, [limit, page]);
  const lastElement = useMemo(
    () => page * limit - (limit - products.length),
    [products, page, limit],
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
        setPage(1);
      }),
    [],
  );

  useEffect(() => {
    console.log("selected Id : ", selectedId);
  }, [selectedId]);

  return (
    <Flex className="h-full" vertical gap={12}>
      <Title level={2}>Product Management</Title>
      <Flex justify="space-between" align="center" vertical={false}>
        <Search
          placeholder="Search product based on product category, name or description"
          className="!w-120"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
        <Button type="primary">
          <PlusOutlined />
          <Text
            className="border-none flex items-center !text-white"
            onClick={() => setOpenCreate(true)}
          >
            Add Product
          </Text>
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
      <TablePagination
        products={products}
        page={page}
        limit={limit}
        setPage={(page: number) => setPage(page)}
        isLoading={isLoading}
        total={total}
        setSelectedId={(id: string) => setSelectedId(id)}
        setOpenDetail={(open: boolean) => setOpenDetail(open)}
        setOpenEdit={(open: boolean) => setOpenEdit(open)}
      />
      <DetailModal
        open={openDetail}
        setOpen={(stat: boolean) => setOpenDetail(stat)}
        selectedId={selectedId}
      />
      <CreateModal
        open={openCreate}
        setOpen={(stat: boolean) => setOpenCreate(stat)}
      />
      <EditModal
        open={openEdit}
        setOpen={(stat: boolean) => setOpenEdit(stat)}
        selectedId={selectedId}
      />
    </Flex>
  );
}
