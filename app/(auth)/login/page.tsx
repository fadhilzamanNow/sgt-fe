"use client";

import { Button, Form, Input, Typography, message } from "antd";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/utils/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

const { Title, Text } = Typography;

export default function Login() {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setAuth } = useAuth();

  const onSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );
      const token = await userCredential.user.getIdToken();
      setAuth(values.email, token);
      messageApi.success("Login successful!");
      router.push("/products");
    } catch (error: any) {
      messageApi.error(error.message || "Login failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
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
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={loading}
            >
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
