import { Button, Form, Input, InputNumber, Modal, message } from "antd";
import { useCreateProduct } from "../hooks/useProducts";

interface CreateModalProps {
  open: boolean;
  setOpen: (stat: boolean) => void;
}

interface ProductFormData {
  product_title: string;
  product_price: number;
  product_category?: string;
  product_description?: string;
  product_image?: string;
}

export default function CreateModal({ open, setOpen }: CreateModalProps) {
  const [form] = Form.useForm<ProductFormData>();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate: createProduct, isPending } = useCreateProduct();

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();

      createProduct(values, {
        onSuccess: () => {
          messageApi.success("Product created successfully");
          form.resetFields();
          setOpen(false);
        },
        onError: (error) => {
          messageApi.error("Failed to create product");
          console.error(error);
        },
      });
    } catch (error) {}
  };

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Product Create"
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
            Submit
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="create-product"
          className="!mt-6"
        >
          <Form.Item
            label="Product Name"
            name="product_title"
            rules={[
              { required: true, message: "Product name is required" },
              { min: 3, message: "Product name must be at least 3 characters" },
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
            <Input.TextArea placeholder="Enter product description" rows={4} />
          </Form.Item>
          <Form.Item
            label="Product Image"
            name="product_image"
            rules={[{ type: "url", message: "Please enter a valid URL" }]}
          >
            <Input placeholder="Enter image URL" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
