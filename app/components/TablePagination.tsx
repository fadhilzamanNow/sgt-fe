import { Button, message, Space, Table } from "antd";
import { type Product } from "../types/product";
import { useMemo } from "react";

interface TablePaginationProps {
  products: Product[];
  page: number;
  limit: number;
  setPage: (page: number) => void;
  isLoading: boolean;
  total: number;
  setSelectedId: (id: string) => void;
  setOpenDetail: (open: boolean) => void;
  setOpenEdit: (open: boolean) => void;
}

export default function TablePagination({
  products,
  setPage,
  limit,
  page,
  isLoading,
  total,
  setSelectedId,
  setOpenDetail,
  setOpenEdit,
}: TablePaginationProps) {
  const [messageApi, contextHolder] = message.useMessage();

  const columns = useMemo(
    () => [
      {
        title: "No",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Name",
        dataIndex: "product_title",
        key: "product_title",
      },
      {
        title: "Category",
        dataIndex: "product_category",
        key: "product_category",
        render: (text: string | null) => <span>{text ? text : "-"}</span>,
      },
      {
        title: "Price",
        dataIndex: "product_price",
        key: "product_price",
      },
      {
        title: "Description",
        dataIndex: "product_description",
        key: "product_description",
        render: (text: string | null) => <span>{text ? text : "-"}</span>,
      },
      {
        title: "Action",
        render: (_, row) => (
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setSelectedId(row.product_id);
                setOpenDetail(true);
              }}
            >
              Detail
            </Button>

            <Button
              className="!bg-yellow-300 hover:!bg-yellow-400 !text-white !border-none"
              onClick={() => {
                setSelectedId(row.product_id);
                setOpenEdit(true);
              }}
            >
              Edit
            </Button>
            <Button
              className="!bg-red-500 !text-white !border-none hover:!bg-red-600"
              onClick={() => {
                messageApi.info("Delete feature will be available soon", 1);
              }}
            >
              Delete
            </Button>
          </Space>
        ),
      },
    ],
    [setSelectedId, setOpenDetail, setOpenEdit, messageApi],
  );

  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={products}
        loading={isLoading}
        scroll={{ x: 1000 }}
        pagination={{
          position: ["bottomCenter"],
          pageSize: limit,
          total: total,
          onChange: (p) => setPage(p),
          current: page,
        }}
      />
    </>
  );
}
