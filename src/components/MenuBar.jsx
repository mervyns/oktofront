import React from "react";
import { connect, useSelector } from "react-redux";
import { toggleModal } from "../redux/modules/userSlice";
import { Button, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const mapDispatchToProps = { toggleModal };
const { Item } = Menu;

const MenuBar = props => {
  const modalState = useSelector(state => state.user);
  return (
    <Menu mode="horizontal">
      <Item key="logo">Oktovest</Item>
      <Item key="mail">Navigation One</Item>
      <Item key="app">
        Navigation Two
        <UserOutlined />
      </Item>
      <Item key="login" style={{ float: "right" }}>
        <Button type="primary" onClick={() => props.toggleModal(modalState)}>
          Login <UserOutlined />
        </Button>
      </Item>
    </Menu>
  );
};

export default connect(null, mapDispatchToProps)(MenuBar);
