import React, { useEffect, useState } from 'react';
import {
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useRouter } from 'next/router';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Students', '/admin/students', <UserOutlined />),
  getItem('Units', '/admin/units', <VideoCameraOutlined />),
];

const CustomMenu: React.FC = () => {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState<Array<string>>([]);
  
  const onMenuClick = (item: any) => item.key && router.push(item.key);

  useEffect(() => {
    if (router.route) {
      switch (router.route) {
        case "/admin/students":
          setSelectedKey(["/admin/students"]);
          break;
        case "/admin/units":
        case "/admin/units/[id]":
          setSelectedKey(["/admin/units"]);
          break;
        default:
          break;
      }
    }
  }, [router.route]);
  return (
      <Menu
        mode="inline"
        theme="dark"
        items={items}
        selectedKeys={selectedKey}
        onClick={onMenuClick}
        style={{ marginTop: "10px" }}
      />
  );
};

export default CustomMenu;