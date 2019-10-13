import React from "react";
import { merge } from "lodash";
import { makeApiSelector } from "@36node/redux";
import { createTable } from "@36node/redux-antd";
import { makeXlsx, makeXlsxSelector } from "@36node/redux-xlsx";
import { Card, Icon, Tooltip } from "antd";
import styled from "styled-components";

import createExporter from "./exporter";
import createImporter from "./importer";

export const withTable = (
  key,
  { columns, makeList, makeCreate } = {}
) => Component => {
  const list = makeList(key);
  const selectList = makeApiSelector(key);
  const xlsxActions = makeXlsx(key, { columns });
  const selectXlsx = makeXlsxSelector(key);

  const Exporter = createExporter(`${key}Exporter`, {
    makeList,
    selectXlsx,
    xlsxActions,
  });

  const Impoter = createImporter(`${key}Exporter`, {
    selectXlsx,
    xlsxActions,
    makeCreate,
  });

  class Container extends React.PureComponent {
    state = {
      importerOpen: false,
      exporterOpen: false,
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

    handleRefreshFirstPage = () => {
      const { apiData = {} } = this.props;
      const { request = {} } = apiData;
      const newRequest = merge({}, request, { query: { offset: 0 } });
      this.props.dispatch(list(newRequest));
    };

    renderExtra = () => {
      const { apiData = {} } = this.props;
      return (
        <div>
          <span style={{ marginRight: 24, color: "#595959" }}>
            total {apiData.total}
          </span>
          <span>
            <Tool title="刷新">
              <Icon type="sync" onClick={this.handleRefreshFirstPage} />
            </Tool>
            <Tool title="筛选">
              {/* <FilterDropdown
                value={this.showedColumns()}
                onChange={this.onColumnsFilterChange}
                items={TableColumns.map(c => ({ key: c.key, name: c.title }))}
              > */}
              <Icon type="filter" />
              {/* </FilterDropdown> */}
            </Tool>
            <Tool title="导入">
              <Icon type="upload" onClick={this.toggleImporter} />
            </Tool>
            <Tool title="导出">
              <Icon type="download" onClick={this.toggleExporter} />
            </Tool>
          </span>
        </div>
      );
    };

    render() {
      const { table, ...rest } = this.props;

      return (
        <Card title="Pets in store" extra={this.renderExtra()}>
          <Component table={table} {...rest} />
          <Exporter
            visible={this.state.exporterOpen}
            onToggle={this.toggleExporter}
          />
          <Impoter
            visible={this.state.importerOpen}
            onToggle={this.toggleImporter}
          />
        </Card>
      );
    }
  }

  return createTable(key, {
    columns,
    apiAction: list,
    apiSelector: selectList,
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
