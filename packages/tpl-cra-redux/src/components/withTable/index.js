import React from "react";
import { get, isEmpty, isNil } from "lodash";
import { makeApiSelector } from "@36node/redux";
import { createTable } from "@36node/redux-antd";
import { makeXlsx, makeXlsxSelector } from "@36node/redux-xlsx";
import { Card, Dropdown, Tooltip } from "antd";
import {
  SyncOutlined,
  FilterOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

import FilterTree from "./filterTree";
import createExporter from "./exporter";
import createImporter from "./importer";

const defaultPageSize = 10;
function filterColumn(columns, checkedKeys = []) {
  if (!columns) return;
  return columns
    .map(c => {
      const children = filterColumn(c.children, checkedKeys);
      if (children) {
        return { ...c, children };
      }
      return c;
    })
    .filter(c => checkedKeys.includes(c.key) || !isEmpty(c.children));
}

function getCheckedKeys(columns = []) {
  let keys = [];
  for (let column of columns) {
    if (!column.hidden) {
      keys.push(column.key);
      keys = keys.concat(getCheckedKeys(column.children));
    }
  }
  return keys;
}

function emptyRender(val) {
  if (isNil(val)) return "--";
  return val;
}

const fakeAction = () => ({ payload: {}, meta: { types: {} } });

export const withTable = (
  key,
  {
    SearchForm, // 查询使用到的 form 组件
    total = true, // 显示总计， TODO: 可以是 ReactNode 节点
    refresh = true, // 显示刷新
    filter = true, // 显示筛选器
    exporter = true, // 显示导出
    importer = false, // 显示导入
    title, // 表格标题
    columns: inColumns, // 列
    fetchOnMount = true, // 表格第一次加载的时候获取数据
    create = fakeAction, // 上传时创建 row
    list = fakeAction, // 下载列表
    makeListSelector, // 对 list selector 进行增强
    makeXlsxSelector: enhanceXlsxSelector, // 对 xlsx selector 进行增强
  } = {}
) => Component => {
  const EXPORTER_KEY = `${key}Exporter`;
  const IMPORTER_KEY = `${key}Importer`;
  const EXPORTER_LIMIT = 5000;
  const columns = inColumns.map(col => ({ render: emptyRender, ...col }));

  /**
   * 准备 selector 和 actions
   */
  const xlsxActions = makeXlsx(key, {
    columns: columns.filter(c => Boolean(c.dataIndex) || !isEmpty(c.children)),
  });
  const listForExportor = (payload = {}, meta) => {
    const action = list(payload, meta);
    action.key = EXPORTER_KEY;
    action.payload.query = { ...payload.query, limit: EXPORTER_LIMIT };
    return action;
  };
  let xlsxSelector = makeXlsxSelector(key);
  let listSelector = makeApiSelector(key);
  if (makeListSelector) listSelector = makeListSelector(listSelector);
  let exporterSelector = makeApiSelector(EXPORTER_KEY);
  if (makeListSelector) exporterSelector = makeListSelector(exporterSelector);
  if (enhanceXlsxSelector) xlsxSelector = enhanceXlsxSelector(xlsxSelector);

  const Exporter = createExporter(EXPORTER_KEY, {
    title,
    list: listForExportor,
    listSelector: exporterSelector,
    xlsxSelector,
    xlsxActions,
  });

  const Impoter = createImporter(IMPORTER_KEY, {
    title,
    create,
    xlsxActions,
    xlsxSelector,
  });

  class Container extends React.PureComponent {
    state = {
      exporterOpen: false,
      importerOpen: false,
      checkedKeys: getCheckedKeys(columns),
    };

    handleRefresh = () => {
      const { listState } = this.props;
      this.handleFetch(listState.request);
    };

    handleFetch = (payload = {}, page = 1) => {
      const query = {
        ...get(this.props, "listState.request.query"),
        _offset: (page - 1) * defaultPageSize,
        ...payload.query,
      };
      this.props.dispatch(list({ ...payload, query }));
    };

    handleFilterKeys = checkedKeys => {
      this.setState({ checkedKeys });
    };

    toggleExporter = () => {
      this.setState({
        exporterOpen: !this.state.exporterOpen,
      });
    };

    toggleImporter = () => {
      this.setState({
        importerOpen: !this.state.importerOpen,
      });
    };

    renderExtra = () => {
      const { listState = {} } = this.props;
      return (
        <div>
          <span style={{ marginRight: 24, color: "#595959" }}>
            总计 {listState.total}
          </span>
          <span>
            {total && (
              <Tool title="刷新">
                <SyncOutlined onClick={this.handleRefresh} />
              </Tool>
            )}
            {filter && (
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
                <Tool title="筛选">
                  <FilterOutlined />
                </Tool>
              </Dropdown>
            )}
            {importer && (
              <Tool title="导入">
                <UploadOutlined onClick={this.toggleImporter} />
              </Tool>
            )}
            {exporter && (
              <Tool title="导出">
                <DownloadOutlined onClick={this.toggleExporter} />
              </Tool>
            )}
          </span>
        </div>
      );
    };

    render() {
      const { table, listState, className, ...rest } = this.props;
      const filtered = filterColumn(columns, this.state.checkedKeys);
      return (
        <div className={className}>
          {SearchForm && <SearchForm onFetch={this.handleFetch} />}
          <Card title={title} extra={this.renderExtra()}>
            <Component {...table} columns={filtered} {...rest} />
            {this.state.exporterOpen && (
              <Exporter
                onToggle={this.toggleExporter}
                columns={filtered}
                request={listState.request}
              />
            )}
            {Impoter && this.state.importerOpen && (
              <Impoter onToggle={this.toggleImporter} />
            )}
          </Card>
        </div>
      );
    }
  }

  return createTable(key, {
    defaultPageSize,
    columns,
    list,
    listSelector,
    fetchOnMount,
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
