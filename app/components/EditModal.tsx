import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Skeleton,
  message,
} from "antd";
import { useGetProductById, useEditProduct } from "../hooks/useProducts";
import { useEffect } from "react";

interface EditModalProps {
  open: boolean;
  setOpen: (stat: boolean) => void;
  selectedId: string;
}

interface ProductFormData {
  product_title: string;
  product_price: number;
  product_category?: string;
  product_description?: string;
  product_image?: string;
}

export default function EditModal({
  open,
  setOpen,
  selectedId,
}: EditModalProps) {
  const [form] = Form.useForm<ProductFormData>();
  const [messageApi, contextHolder] = message.useMessage();
  const { data, isLoading } = useGetProductById(selectedId, !!selectedId);
  const { mutate: editProduct, isPending } = useEditProduct();

  useEffect(() => {
    if (open && data?.data) {
      form.setFieldsValue({
        product_title: data.data.product_title,
        product_price: data.data.product_price,
        product_category: data.data.product_category,
        product_description: data.data.product_description,
        product_image: data.data.product_image,
      });
    }
  }, [open, data, form]);

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();

      editProduct(
        { ...values, product_id: selectedId },
        {
          onSuccess: () => {
            messageApi.success("Product updated successfully");
            form.resetFields();
            setOpen(false);
          },
          onError: (error) => {
            messageApi.error("Failed to update product");
          },
        },
      );
    } catch (error) {}
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Product Edit"
        open={open}
        closable={false}
        onCancel={handleCancel}
        maskClosable
        centered
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={onSubmit}
            loading={isPending}
          >
            Update
          </Button>,
        ]}
      >
        {isLoading ? (
          <div className="!mt-6">
            <Skeleton active paragraph={{ rows: 5 }} />
          </div>
        ) : (
          <Form
            form={form}
            layout="vertical"
            name="edit-product"
            className="!mt-6"
          >
            <Form.Item
              label="Product Name"
              name="product_title"
              rules={[
                { required: true, message: "Product name is required" },
                {
                  min: 3,
                  message: "Product name must be at least 3 characters",
                },
              ]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>
            <Form.Item
              label="Product Price"
              name="product_price"
              rules={[
                { required: true, message: "Product price is required" },
                {
                  type: "number",
                  min: 0.01,
                  message: "Price must be greater than 0",
                },
              ]}
            >
              <InputNumber
                placeholder="Enter product price"
                className="!w-full"
                min={0}
              />
            </Form.Item>
            <Form.Item label="Product Category" name="product_category">
              <Input placeholder="Enter product category" />
            </Form.Item>
            <Form.Item label="Product Description" name="product_description">
              <Input.TextArea
                placeholder="Enter product description"
                rows={4}
              />
            </Form.Item>
            <Form.Item
              label="Product Image"
              name="product_image"
              rules={[{ type: "url", message: "Please enter a valid URL" }]}
            >
              <Input placeholder="Enter image URL" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}
