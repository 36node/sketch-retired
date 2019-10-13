import React, { Fragment } from "react";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";

/**
 * crumbs example
 *
 * [["Home", "/home"], ["SubPage1", "/home/subpage"], "SubPage2", "Current Title"]
 */
export default (...crumbs) => WrappedComponent => {
  const hocComponent = ({ ...props }) => (
    <Fragment>
      <Breadcrumb style={{ margin: "16px 0" }}>
        {crumbs.map(item => {
          const [title, path] = [].concat(item);
          return (
            <Breadcrumb.Item key={title}>
              {path ? <NavLink to={path}>{title}</NavLink> : title}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
      <WrappedComponent {...props} />
    </Fragment>
  );

  return hocComponent;
};
