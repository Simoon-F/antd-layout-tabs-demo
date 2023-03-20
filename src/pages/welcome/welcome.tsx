import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps, Tabs } from "antd";
import { useState } from "react";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
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
  getItem("Navigation One", "sub1", null, [
    getItem("Option 1", "1"),
    getItem("Option 2", "2"),
    getItem("Option 3", "3"),
    getItem("Option 4", "4"),
  ]),
  getItem("Navigation Two", "sub2", null, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),
  getItem("Navigation Three", "sub4", null, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Option 11", "11"),
    getItem("Option 12", "12"),
  ]),
  getItem("FAQ", "sub5"),
];

const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

export const Welcome = () => {
  const [activeTab, setActiveTab] = useState<string>("");

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const [panes, setPanes] = useState([]);

  const handleMenuClick = (menuItem: any) => {
    const { key, title } = menuItem;

    // check if the pane already exists
    const paneExists = panes.some((pane: any) => pane.key === key);

    if (paneExists) {
      handleTabChange(key);
    } else {
      const newPanes: any = [...panes];

      newPanes.push({ title, content: `${title} Content`, key });
      setPanes(newPanes);
      handleTabChange(key);
    }
  };

  const findMenuItem = (items: MenuItem[], key: string): string[] | null => {
    for (const item of items) {
      if (item.key === key) {
        return [key]; // 返回当前菜单项的key
      } else if (item.children) {
        const childResult = findMenuItem(item.children, key);

        if (childResult) {
          return [item.key, ...childResult]; // 将当前菜单项的key和子菜单的key合并返回
        }
      }
    }

    return null;
  };

  const handleTabChange = (key: string) => {
    setActiveTab(key);

    const result = findMenuItem(items, key);

    if (result) {
      setOpenKeys(result);

      setSelectedKeys(result);
    }
  };

  const renderTabItems = () => {
    return panes.map((pane: any) => ({
      key: pane.key,
      label: pane.title,
      children: <h1>{pane.content}</h1>,
    }));
  };

  const handlePrevClick = () => {};

  const handleNextClick = () => {};

  const tabBarExtraContent = panes.length > 3 && (
    <>
      <Button type="text" icon={<LeftOutlined />} onClick={handlePrevClick} />
      <Button type="text" icon={<RightOutlined />} onClick={handleNextClick} />
    </>
  );

  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={200} style={{ backgroundColor: "white" }}>
        <Menu
          mode={"inline"}
          items={items}
          style={{ height: "100%", borderRight: 0 }}
          onClick={(info) =>
            handleMenuClick({
              key: info.key,
              title: info.domEvent.target.innerText as string,
            })
          }
          openKeys={openKeys}
          onOpenChange={onOpenChange} // 折叠板
          selectedKeys={selectedKeys} // 菜单选中
        />
      </Sider>
      <Layout style={{ padding: "0 24px 24px" }}>
        <Tabs
          items={renderTabItems()}
          moreIcon={false}
          onChange={handleTabChange}
          animated={{ inkBar: true, tabPane: true }}
          activeKey={activeTab}
          tabBarExtraContent={tabBarExtraContent}
        />
      </Layout>
    </Layout>
  );
};
