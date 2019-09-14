import React, { Fragment } from "react";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import { Menu, Icon } from "antd";

const data = [
  {
    path: "/",
    title: "home",
    icon: "home",
  },
  // template-example-start
  {
    path: "/pet-store",
    title: "pet-store",
    icon: "shop",
  },
  {
    path: "/github",
    title: "github",
    icon: "github",
  },
  {
    path: "/redux-ui",
    title: "redux-ui",
    icon: "build",
  },
  {
    path: "/redux-form",
    title: "redux-form",
    icon: "form",
  },
  // template-example-end
];

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
          {data.map(item => (
            <Menu.Item key={item.path}>
              <NavLink to={item.path}>
                <Icon type={item.icon} />
                {item.title}
              </NavLink>
            </Menu.Item>
          ))}
        </Menu>
      </Fragment>
    );
  }
}
