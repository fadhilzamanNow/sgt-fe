"use client";

import { DropboxOutlined } from "@ant-design/icons";
import { Card, Flex, Typography } from "antd";
import AuthGuard from "../components/AuthGuard";

const { Title } = Typography;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requireAuth={false}>
      <Flex
        justify="center"
        align="center"
        className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <Card className="w-full max-w-md mx-4 shadow-lg">
          <Flex vertical align="center" gap={24}>
            <Flex vertical align="center" gap={8}>
              <DropboxOutlined className="!text-5xl !text-blue-600" />
              <Title level={2} className="!mb-0">
                Summit
              </Title>
            </Flex>
            {children}
          </Flex>
        </Card>
      </Flex>
    </AuthGuard>
  );
}
