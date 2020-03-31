import React, { Fragment } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu } from "antd";

import { menu } from "../config";

const renderMenu = menu => {
  if (!Array.isArray(menu)) return;
  return menu.map(item =>
    item.children ? (
      <Menu.SubMenu
        key={item.title}
        title={
          <span>
            {item.icon}
            {item.title}
          </span>
        }
      >
        {renderMenu(item.children)}
      </Menu.SubMenu>
    ) : (
      <Menu.Item key={item.path}>
        <NavLink to={item.path}>
          {item.icon}
          {item.title}
        </NavLink>
      </Menu.Item>
    )
  );
};

@withRouter
export default class Nav extends React.Component {
  render() {
    const { pathname } = this.props.location;
    return (
      <Fragment>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname]}
          style={{ lineHeight: "64px" }}
        >
          {renderMenu(menu)}
        </Menu>
      </Fragment>
    );
  }
}
