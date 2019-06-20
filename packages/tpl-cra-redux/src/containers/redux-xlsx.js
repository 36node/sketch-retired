import React, { PureComponent } from "react";
import DocumentTitle from "react-document-title";
import { Container, Jumbotron } from "../components/layout";
import {
  Divider,
  Table,
  Card,
  Input,
  Radio,
  Form,
  Button,
  Upload,
  Icon,
} from "antd";
import { petStoreActions, reduxXlsxActions } from "../actions";
import { petStoreSelectors } from "../selectors";
import { connect } from "react-redux";
import { isEmpty } from "lodash";
import createForm from "@36node/redux-form-antd";

const TableColumns = [
  { title: "name", dataIndex: "name", key: "name" },
  { title: "owner", dataIndex: "owner", key: "owner" },
  {
    title: "tag",
    dataIndex: "tag",
    key: "tag",
    filters: [{ text: "CAT", value: "CAT" }, { text: "DOG", value: "DOG" }],
  },
  { title: "age", dataIndex: "age", key: "age", sorter: true },
];

@createForm("EXPORT_OPTIONS_FORM")
class ExportOptionForm extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch(
          reduxXlsxActions.petsXlsx.export({
            columns: TableColumns,
            fileName: "pets",
            fileType: values.fileType,
            params: {
              // datasource params
              query: {
                offset: 0,
                limit: Number(values.limit) || 100,
              },
            },
          })
        );
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props;

    return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Form.Item label="Rows">
          {getFieldDecorator("limit", {
            initialValue: 100,
          })(<Input placeholder="Row count, default is 100" />)}
        </Form.Item>

        <Form.Item label="Filetype">
          {getFieldDecorator("fileType", { initialValue: "xlsx" })(
            <Radio.Group>
              <Radio value="xlsx">xlsx</Radio>
              <Radio value="csv">csv</Radio>
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            <Icon type="download" /> Export
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

@connect(state => {
  const listPetsState = petStoreSelectors.listPets(state) || {};

  return {
    pets: listPetsState.result,
    loading: listPetsState.loading,
    query: listPetsState.request.query,
    total: listPetsState.total,
  };
})
class ReduxXlsxExample extends PureComponent {
  componentDidMount() {
    this.listPets({ current: 1, pageSize: 10 });
  }

  listPets = (pagination = {}, filters = {}, sort = {}) => {
    const query = {};

    if (!isEmpty(pagination)) {
      const { current = 1, pageSize = 10 } = pagination;
      query.limit = pageSize;
      query.offset = (current - 1) * pageSize;
    }

    if (!isEmpty(filters)) {
      Object.keys(filters).forEach(k => {
        query[k] = filters[k];
      });
    }

    if (!isEmpty(sort)) {
      const { field, order } = sort;
      query.sort = (order === "ascend" ? "" : "-") + field;
    }

    this.props.dispatch(petStoreActions.listPets.request({ query }));
  };

  renderTitle() {
    return <ExportOptionForm />;
  }

  renderExtra() {
    return (
      <Upload
        beforeUpload={file => {
          this.props.dispatch(
            reduxXlsxActions.petsXlsx.import({
              columns: TableColumns,
              dataSource: file,
            })
          );
          return false;
        }}
        showUploadList={false}
      >
        <Button>
          <Icon type="upload" /> import
        </Button>
      </Upload>
    );
  }

  render() {
    const { pets = [], loading, total, query = {} } = this.props;

    const { limit = 10, offset = 0 } = query;
    const pagination = {
      current: Math.floor(offset / limit + 1),
      pageSize: limit,
      total,
    };

    return (
      <Card title={this.renderTitle()} extra={this.renderExtra()}>
        <Table
          rowKey="id"
          loading={loading}
          columns={TableColumns}
          onChange={this.listPets}
          dataSource={pets}
          pagination={pagination}
        />
      </Card>
    );
  }
}

export default class ReduxXlsx extends PureComponent {
  render() {
    return (
      <DocumentTitle title="@36node - ">
        <Container>
          <Jumbotron> Redux Form. </Jumbotron>

          <Divider />

          <ReduxXlsxExample />
        </Container>
      </DocumentTitle>
    );
  }
}
