import { Button, Form, Input, InputNumber, Modal, message } from "antd";
import { z } from "zod";
import { useCreateProduct } from "../hooks/useProducts";

interface CreateModalProps {
  open: boolean;
  setOpen: (stat: boolean) => void;
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

export default function CreateModal({ open, setOpen }: CreateModalProps) {
  const [form] = Form.useForm<ProductFormData>();
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate: createProduct, isPending } = useCreateProduct();

  const onSubmit = async () => {
    try {
      const values = await form.validateFields();
      const result = productSchema.safeParse(values);

      if (!result.success) {
        const errors = result.error;
        form.setFields(
          Object.entries(errors).map(([name, messages]) => ({
            name: name as any,
            errors: messages as string[],
          })),
        );
        return;
      }

      createProduct(result.data, {
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
            <Input.TextArea placeholder="Enter product description" rows={4} />
          </Form.Item>
          <Form.Item label="Product Image" name="product_image">
            <Input placeholder="Enter image URL" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
