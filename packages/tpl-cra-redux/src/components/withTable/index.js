import React from "react";
import { get, isEmpty } from "lodash";
import { createTable } from "@36node/redux-antd";
import { makeXlsx, makeXlsxSelector } from "@36node/redux-xlsx";
import { Card, Dropdown, Icon, Tooltip } from "antd";
import styled from "styled-components";

import FilterTree from "./filterTree";
import createExporter from "./exporter";
import createImporter from "./importer";

const defaultPageSize = 10;

function filterColumn(columns, checkedKeys = []) {
  if (!columns) return;
  return columns
    .map(c => ({ ...c, children: filterColumn(c.children, checkedKeys) }))
    .filter(c => checkedKeys.includes(c.key) || !isEmpty(c.children));
}

function getCheckedKeys(columns = []) {
  let keys = [];
  for (let column of columns) {
    if (!column.hide) {
      keys.push(column.key);
      keys = keys.concat(getCheckedKeys(column.children));
    }
  }
  return keys;
}

export const withTable = (
  key,
  {
    SearchForm, // 查询使用到的 form 组件
    title,
    columns,
    create,
    list,
    listSelector,
    listForExportor,
    listSelectorForExporter,
  } = {}
) => Component => {
  const xlsxActions = makeXlsx(key, { columns });
  const xlsxSelector = makeXlsxSelector(key);

  const Exporter = createExporter(key, {
    title,
    list: listForExportor || list, // 如果没提供额外的 action，那么只导出第一页
    listSelector: listSelectorForExporter || listSelector,
    xlsxSelector,
    xlsxActions,
  });

  const Impoter = createImporter(key, {
    create,
    xlsxActions,
    xlsxSelector,
  });

  class Container extends React.PureComponent {
    state = {
      importerOpen: false,
      exporterOpen: false,
      checkedKeys: getCheckedKeys(columns),
    };

    toggleImporter = () => {
      this.setState({
        importerOpen: !this.state.importerOpen,
      });
    };

    toggleExporter = () => {
      this.setState({
        exporterOpen: !this.state.exporterOpen,
      });
    };

    handleRefresh = () => {
      this.handleFetch();
    };

    handleFetch = (filter, page = 1) => {
      const query = {
        ...get(this.props, "listState.request.query"),
        offset: (page - 1) * defaultPageSize,
      };
      if (filter) query.filter = filter;
      this.props.dispatch(list({ query }));
    };

    handleFilterKeys = checkedKeys => {
      this.setState({ checkedKeys });
    };

    renderExtra = () => {
      const { listState = {} } = this.props;
      return (
        <div>
          <span style={{ marginRight: 24, color: "#595959" }}>
            total {listState.total}
          </span>
          <span>
            <Tool title="refresh">
              <Icon type="sync" onClick={this.handleRefresh} />
            </Tool>
            <Dropdown
              overlay={
                <FilterTree
                  columns={columns}
                  onChange={this.handleFilterKeys}
                  value={this.state.checkedKeys}
                />
              }
              trigger={["click"]}
            >
              <Tool title="filter">
                <Icon type="filter" />
              </Tool>
            </Dropdown>
            <Tool title="import">
              <Icon type="upload" onClick={this.toggleImporter} />
            </Tool>
            <Tool title="export">
              <Icon type="download" onClick={this.toggleExporter} />
            </Tool>
          </span>
        </div>
      );
    };

    render() {
      const { table, ...rest } = this.props;
      const filtered = filterColumn(columns, this.state.checkedKeys);
      return (
        <>
          {SearchForm && (
            <Card style={{ marginBottom: 8 }}>
              <SearchForm onFetch={this.handleFetch} />
            </Card>
          )}
          <Card title={title} extra={this.renderExtra()}>
            <Component columns={filtered} {...table} {...rest} />
            {this.state.exporterOpen && (
              <Exporter onToggle={this.toggleExporter} />
            )}
            {this.state.importerOpen && (
              <Impoter onToggle={this.toggleImporter} />
            )}
          </Card>
        </>
      );
    }
  }

  return createTable(key, {
    defaultPageSize,
    columns,
    list,
    listSelector,
  })(Container);
};

const Tool = styled(Tooltip)`
  margin-right: 5px;
  color: #595959;
  :hover {
    cursor: pointer;
    color: #262626;
  }
`;
