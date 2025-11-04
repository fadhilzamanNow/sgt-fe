"use client";

import { useState } from "react";
import {
  DesktopOutlined,
  DropboxOutlined,
  FileOutlined,
  HomeOutlined,
  InboxOutlined,
  LogoutOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { ConfigProviderProps, MenuProps } from "antd";
import { Avatar, ConfigProvider, Dropdown, Space } from "antd";
import { Breadcrumb, Layout as Layouts, Menu, theme } from "antd";
import { Typography } from "antd";
import { Flex } from "antd";
import { StyleProvider } from "@ant-design/cssinjs";
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layouts;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const dropdownItems: MenuProps["items"] = [
  getItem("Logout", "1", <LogoutOutlined />),
];

const menuItems: MenuItem[] = [getItem("Products", "1", <InboxOutlined />)];

const customTheme: ConfigProviderProps = {
  theme: {
    token: {},
    components: {
      Layout: {
        siderBg: "#ffffff",
      },
      Menu: {},
    },
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider {...customTheme}>
      <Layouts style={{ minHeight: "100vh" }}>
        <Sider
          collapsed={collapsed}
          onCollapse={(value: boolean) => setCollapsed(value)}
          breakpoint="xs"
          className="!fixed !left-0 !top-0 !bottom-0 !h-screen !overflow-auto !border-r !border-gray-200"
        >
          <Flex className="h-16 p-" justify="center" align="center">
            <Space size="middle">
              <DropboxOutlined className="!text-black" size={32} />
              {!collapsed && (
                <Title level={3} className="!text-black !mb-0 ">
                  Summit
                </Title>
              )}
            </Space>
          </Flex>
          <Menu
            theme="light"
            defaultSelectedKeys={["1"]}
            mode="inline"
            items={menuItems}
            className="!border-none"
          />
        </Sider>
        <Layouts className={collapsed ? "!ml-20" : "!ml-[200px]"}>
          <Header className="flex justify-end items-center shadow-sm !sticky !top-0 !z-10 !bg-white !px-3">
            <Dropdown menu={{ items: dropdownItems }}>
              <Avatar size={32} className="cursor-pointer">
                S
              </Avatar>
            </Dropdown>
          </Header>
          <Content className="!m-0 !mx-4">
            <Breadcrumb
              className="!my-4"
              items={[{ title: <HomeOutlined /> }, { title: "Product " }]}
            />
            <div className="bg-white rounded-sm !p-4 ">{children}</div>
          </Content>
        </Layouts>
      </Layouts>
    </ConfigProvider>
  );
}
