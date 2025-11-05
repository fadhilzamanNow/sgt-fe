import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Skeleton,
  message,
} from "antd";
import { z } from "zod";
import { useGetProductById, useEditProduct } from "../hooks/useProducts";
import { useEffect } from "react";

interface EditModalProps {
  open: boolean;
  setOpen: (stat: boolean) => void;
  selectedId: string;
}

const productSchema = z.object({
  product_title: z
    .string()
    .min(3, "Product name must be at least 3 characters"),
  product_price: z
    .number({ message: "Price is required" })
    .positive("Price must be positive"),
  product_category: z.string().optional(),
  product_description: z.string().optional(),
  product_image: z.url("Must be a valid URL").optional().or(z.literal("")),
});

type ProductFormData = z.infer<typeof productSchema>;

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
      const result = productSchema.safeParse(values);

      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        form.setFields(
          Object.entries(errors).map(([name, messages]) => ({
            name: name as any,
            errors: messages as string[],
          })),
        );
        return;
      }

      editProduct(
        { ...result.data, product_id: selectedId },
        {
          onSuccess: () => {
            messageApi.success("Product updated successfully");
            form.resetFields();
            setOpen(false);
          },
          onError: (error) => {
            messageApi.error("Failed to update product");
            console.error(error);
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
              required
              rules={[{ required: true, message: "Product name is required" }]}
            >
              <Input placeholder="Enter product name" />
            </Form.Item>
            <Form.Item
              label="Product Price"
              name="product_price"
              required
              rules={[{ required: true, message: "Product price is required" }]}
            >
              <InputNumber
                placeholder="Enter product price"
                className="!w-full"
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
            <Form.Item label="Product Image" name="product_image">
              <Input placeholder="Enter image URL" />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}
