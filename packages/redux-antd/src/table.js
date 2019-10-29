import React from "react";
import { connect } from "react-redux";

export const createTable = (
  key,
  {
    defaultPageSize = 10,
    fetchOnMount = true,
    columns,
    list,
    listSelector = () => {},
  } = {}
) => Component => {
  class WithTable extends React.Component {
    componentDidMount() {
      if (fetchOnMount) this.fetch();
    }

    fetch = (pagination = {}, filters = {}, sort = {}) => {
      // fetching data only when api maker is provided
      if (!list) return;
      // query could be changed from outside
      const query = { ...this.props.listState.request.query };
      const { current = 1, pageSize = defaultPageSize } = pagination;
      query.limit = pageSize;
      query.offset = (current - 1) * pageSize;

      Object.keys(filters)
        .filter(k => Boolean(filters[k]))
        .forEach(k => {
          if (!query.filter) query.filter = {};
          query.filter[k] = filters[k];
        });

      const { field, order } = sort;
      if (field) query.sort = (order === "ascend" ? "" : "-") + field;
      else delete query.sort;

      this.props.dispatch(
        list({
          ...this.props.listState.request,
          query,
        })
      );
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
        columns,
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
