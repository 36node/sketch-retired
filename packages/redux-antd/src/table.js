import React from "react";
import { connect } from "react-redux";

const defaultPageSize = 10;

export const createTable = (
  key,
  { list, listSelector = () => {} } = {}
) => Component => {
  class WithTable extends React.Component {
    componentDidMount() {
      this.fetch();
    }

    fetch = (pagination = {}, filters = {}, sort = {}) => {
      // fetching data only when api maker is provided
      if (!list) return;
      // query could be changed from outside
      const query = { ...this.props.listState.request.query };
      const { current = 1, pageSize = defaultPageSize } = pagination;
      query.limit = pageSize;
      query.offset = (current - 1) * pageSize;

      Object.keys(filters).forEach(k => {
        query[k] = filters[k];
      });

      const { field, order } = sort;
      if (field) query.sort = (order === "ascend" ? "" : "-") + field;

      this.props.dispatch(list({ query }));
    };

    handleChange = (pagination = {}, filters = {}, sort = {}) => {
      this.fetch(pagination, filters, sort);
    };

    render() {
      const { listState = {}, ...rest } = this.props;
      const { loading = false, result = [], total, request = {} } = listState;
      const { limit = 10, offset = 0 } = request.query || {};
      const pagination = {};

      // pagination from api data
      if (total) {
        pagination.current = Math.floor(offset / limit + 1);
        pagination.pageSize = limit;
        pagination.total = total;
      }

      const table = {
        pagination,
        rowKey: "id",
        loading,
        dataSource: result,
        onChange: this.handleChange,
      };

      return <Component table={table} listState={listState} {...rest} />;
    }
  }

  const Connected = connect((state, props) => ({
    listState: listSelector(state),
  }))(WithTable);

  return Connected;
};
