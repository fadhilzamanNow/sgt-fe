"use client";

import { DropboxOutlined } from "@ant-design/icons";
import { Card, Flex, Typography } from "antd";

const { Title } = Typography;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      justify="center"
      align="center"
      className="min-h-screen bg-white  sm:bg-[#F3F3F3] "
    >
      <Card className="w-full max-w-md mx-4 shadow-none sm:shadow-lg !border-none">
        <Flex vertical align="center" gap={24}>
          <Flex vertical={false} align="center" gap={8}>
            <DropboxOutlined className="!text-5xl !text-blue-600" />
            <Title level={2} className="!mb-0">
              Summit
            </Title>
          </Flex>
          {children}
        </Flex>
      </Card>
    </Flex>
  );
}
