import { Button, Space, Table } from "antd";
import { type Product } from "../types/product";
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

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
}

export default function TablePagination({
  products,
  page,
  limit,
}: TablePaginationProps) {
  return (
    <Table
      columns={columns}
      dataSource={products}
      pagination={{
        position: ["bottomCenter"],
        pageSize: limit,
        total: 50,
        onChange: (p) => console.log(p),
      }}
    />
  );
}
