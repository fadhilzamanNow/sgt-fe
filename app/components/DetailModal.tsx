import { Button, Flex, Modal, Skeleton, Space, Typography, Image } from "antd";
import { useGetProductById } from "../hooks/useProducts";
import { useMemo, useState } from "react";
import { format } from "date-fns";

interface DetailModalProps {
  open: boolean;
  setOpen: (stat: boolean) => void;
  selectedId: string;
}

const { Text } = Typography;

export default function DetailModal({
  open,
  setOpen,
  selectedId,
}: DetailModalProps) {
  const [visible, setVisible] = useState(false);
  const { data, isLoading } = useGetProductById(selectedId, !!selectedId);

  const createdAt = useMemo(() => {
    if (data?.data.created_timestamp) {
      return format(data?.data.created_timestamp, "PPPPpppp");
    }
    return "";
  }, [data]);

  const updatedAt = useMemo(() => {
    if (data?.data.updated_timestamp) {
      return format(data?.data.updated_timestamp, "PPPPpppp");
    }
    return "";
  }, [data]);
  return (
    <Modal
      title="Product Detail"
      open={open}
      closable={false}
      onCancel={() => setOpen(false)}
      footer={() => <Button onClick={() => setOpen(false)}>Close</Button>}
      maskClosable
      centered
    >
      {isLoading ? (
        <Flex vertical gap={16}>
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton active paragraph={{ rows: 1 }} />
          <Skeleton.Button active />
        </Flex>
      ) : (
        <Flex vertical gap={16}>
          <Space direction="vertical" size={4}>
            <Text type="secondary">Name</Text>
            <Text strong>{data?.data.product_title}</Text>
          </Space>
          <Space direction="vertical" size={4}>
            <Text type="secondary">Category</Text>
            <Text strong>
              {data?.data.product_category ? data?.data.product_category : "-"}
            </Text>
          </Space>
          <Space direction="vertical" size={4}>
            <Text type="secondary">Price</Text>
            <Text strong>{data?.data.product_price}</Text>
          </Space>
          <Space direction="vertical" size={4}>
            <Text type="secondary">Description</Text>
            <Text strong>
              {data?.data.product_description
                ? data?.data.product_description
                : "-"}
            </Text>
          </Space>
          <Space direction="vertical" size={4}>
            <Text type="secondary">Created At</Text>
            <Text strong>{createdAt}</Text>
          </Space>
          <Space direction="vertical" size={4}>
            <Text type="secondary">Updated At</Text>
            <Text strong>{updatedAt}</Text>
          </Space>
          <Space direction="vertical" size={4}>
            <Text type="secondary">Image</Text>
            {data?.data.product_image ? (
              <Button type="primary" onClick={() => setVisible(true)}>
                Click to see Product Image
              </Button>
            ) : (
              <Text strong>-</Text>
            )}
          </Space>
          <Image
            width={200}
            alt="Product Image"
            style={{ display: "none" }}
            preview={{
              visible,
              src: `${data?.data.product_image}`,
              onVisibleChange: (value) => {
                setVisible(value);
              },
            }}
          />
        </Flex>
      )}
    </Modal>
  );
}
