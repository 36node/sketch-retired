import React from "react";
import { Table } from "antd";

const TableComponent = ({ propDefinitions }) => {
  console.log(propDefinitions);
  const columns = [
    {
      title: "Name",
      dataIndex: "property",
      key: "property",
    },
    {
      title: "Required",
      dataIndex: "required",
      render: required => {
        return required ? "true" : "false";
      },
    },
    {
      title: "Type",
      dataIndex: "propType.name",
      key: "propType",
    },
    {
      title: "Default",
      dataIndex: "defaultValue",
      key: "defaultValue",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <Table
      size={"small"}
      style={{ marginTop: 12 }}
      columns={columns}
      dataSource={propDefinitions}
      pagination={false}
    />
  );
};

export default TableComponent;
