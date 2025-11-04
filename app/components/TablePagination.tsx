import { Button, Space, Table } from "antd";
import { type Product } from "../types/product";

const columns = [
  {
    title: "No",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "product_title",
    key: "name",
  },
  {
    title: "Price",
    dataIndex: "product_price",
    key: "age",
  },
  {
    title: "Description",
    dataIndex: "product_description",
    key: "address",
  },
  {
    title: "Action",
    render: () => (
      <Space>
        <Button type="primary">Detail</Button>
        <Button className="!bg-yellow-300 hover:!bg-yellow-400 !text-white !border-none">
          Edit
        </Button>
        <Button className="!bg-red-500 !text-white !border-none hover:!bg-red-600">
          Delete
        </Button>
      </Space>
    ),
  },
];

interface TablePaginationProps {
  products: Product[];
  page: number;
  limit: number;
  setPage: (page: number) => void;
  isLoading: boolean;
  total: number;
}

export default function TablePagination({
  products,
  setPage,
  limit,
  page,
  isLoading,
  total,
}: TablePaginationProps) {
  return (
    <Table
      columns={columns}
      dataSource={products}
      loading={isLoading}
      pagination={{
        position: ["bottomCenter"],
        pageSize: limit,
        total: total,
        onChange: (p) => setPage(p),
        current: page,
      }}
    />
  );
}
