"use client";

import { Button, Form, Input, Typography, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Title, Text } = Typography;

export default function Register() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (values: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      console.log("reg val:", values);
      messageApi.success("Registration successful!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="w-full">
        <Title level={3} className="text-center !mb-6">
          Sign Up
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
            <Input
              prefix={<MailOutlined />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The passwords do not match!"),
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Confirm your password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        <Text className="text-center block">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:text-blue-700">
            Sign In
          </Link>
        </Text>
      </div>
    </>
  );
}
