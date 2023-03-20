import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, MenuProps, Tabs } from "antd";
import { SetStateAction, useRef, useState } from "react";

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
];

const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

export const Welcome = () => {
  const [activeTab, setActiveTab] = useState("");

  const [panes, setPanes] = useState([]);

  const tabsRef = useRef<any>(null);

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

  const handleTabChange = (key: SetStateAction<string>) => {
    setActiveTab(key);
  };

  const renderTabItems = () => {
    return panes.map((pane: any) => ({
      key: pane.key,
      label: pane.title,
      children: <h1>{pane.content}</h1>,
    }));
  };

  const handlePrevClick = () => {
    const tabsNode: any = document.querySelector(".ant-tabs-nav-list");

    const tabsWrapperNode = tabsNode.parentElement;

    const availableWidth = tabsWrapperNode.clientWidth;

    const currentX =
      parseInt(getComputedStyle(tabsNode).transform.split(",")[4].trim()) || 0;

    const newX = Math.min(0, currentX + availableWidth);

    tabsNode.style = `transform: translate(${newX}px, 0px);`;
  };

  const handleNextClick = () => {
    const tabsNode: any = document.querySelector(".ant-tabs-nav-list");

    const tabsWrapperNode = tabsNode.parentElement;

    const availableWidth = tabsWrapperNode.clientWidth;

    const currentX =
      parseInt(getComputedStyle(tabsNode).transform.split(",")[4].trim()) || 0;

    const totalWidth = tabsNode.scrollWidth;

    const newX = Math.max(
      -totalWidth + availableWidth,
      currentX - availableWidth
    );

    tabsNode.style = `transform: translate(${newX}px, 0px);`;
  };

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
          onOpenChange={onOpenChange}
        />
      </Sider>
      <Layout ref={tabsRef} style={{ padding: "0 24px 24px" }}>
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
