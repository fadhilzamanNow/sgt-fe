"use client";

import { Button, Form, Input, Typography, message } from "antd";
import Link from "next/link";

const { Title, Text } = Typography;

export default function Login() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      console.log("Login val:", values);
      messageApi.success("Login successful!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="w-full">
        <Title level={3} className="text-center !mb-6">
          Sign In
        </Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input placeholder="Enter your email" size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Enter your password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Text className="text-center block">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:text-blue-700">
            Sign Up
          </Link>
        </Text>
      </div>
    </>
  );
}
