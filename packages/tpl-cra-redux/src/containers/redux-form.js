import React, { PureComponent } from "react";
import {
  Switch,
  Form,
  Select,
  InputNumber,
  Slider,
  Radio,
  Divider,
  Button,
  Row,
  Col,
} from "antd";
import { connect } from "react-redux";
import { makeForm, makeFormSelector } from "@36node/redux";
import { createForm } from "@36node/redux-antd";
import { isNil } from "lodash";

import withBreadCrumb from "../components/withBreadCrumb";
import Container from "../components/layout/container";
import Jumbotron from "../components/layout/jumbotron";

const REDUX_FORM_KEY = "reduxForm";
const Option = Select.Option;

@createForm(REDUX_FORM_KEY)
class ReduxFormExample extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 6,
        },
        sm: {
          span: 16,
          offset: 6,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Select" hasFeedback>
          {getFieldDecorator("select", {
            initialValue: "china",
            rules: [{ required: true, message: "Please select your country!" }],
          })(
            <Select placeholder="Please select a country">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="Select[multiple]">
          {getFieldDecorator("select-multiple", {
            rules: [
              {
                required: true,
                message: "Please select your favourite colors!",
                type: "array",
              },
            ],
          })(
            <Select
              mode="multiple"
              placeholder="Please select favourite colors"
            >
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          )}
        </Form.Item>

        <Form.Item label="InputNumber">
          {getFieldDecorator("input-number", { initialValue: 3 })(
            <InputNumber min={1} max={10} />
          )}
          <span className="ant-form-text"> machines</span>
        </Form.Item>

        <Form.Item label="Switch">
          {getFieldDecorator("switch", { valuePropName: "checked" })(
            <Switch />
          )}
        </Form.Item>

        <Form.Item label="Slider">
          {getFieldDecorator("slider", { initialValue: 20 })(
            <Slider
              marks={{
                0: "A",
                20: "B",
                40: "C",
                60: "D",
                80: "E",
                100: "F",
              }}
            />
          )}
        </Form.Item>

        <Form.Item label="Radio.Group">
          {getFieldDecorator("radio.group")(
            <Radio.Group>
              <Radio value="a">item 1</Radio>
              <Radio value="b">item 2</Radio>
              <Radio value="c">item 3</Radio>
            </Radio.Group>
          )}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>

          <Button
            onClick={() => {
              this.handleReset();
            }}
            style={{ marginLeft: 8 }}
            type="danger"
            ghost
          >
            Reset
          </Button>
        </Form.Item>
      </Form>
    );
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  handleReset = initialValues => {
    this.props.form.resetFields(initialValues);
  };
}

const form = makeForm(REDUX_FORM_KEY);
const formSelector = makeFormSelector(REDUX_FORM_KEY);

@withBreadCrumb("UI-Example", "Form")
@connect(state => ({
  form: formSelector(state),
}))
export default class extends PureComponent {
  handleSetSelect = () => {
    this.props.dispatch(
      form.saveFields({
        select: {
          name: "select",
          value: "usa",
          touched: true,
          dirty: false,
          validating: false,
        },
      })
    );
  };

  render() {
    const { fields } = this.props.form;
    return (
      <Container>
        <Jumbotron> Redux Form. </Jumbotron>
        <Row style={{ padding: 30 }}>
          {Object.keys(fields).map(k => {
            const val = isNil(fields[k]) ? "" : fields[k];

            return (
              <Row key={k}>
                <Col span={6}>{k}:</Col>
                <Col span={18}>{JSON.stringify(val, 0, 2)}</Col>
              </Row>
            );
          })}
        </Row>
        <Row style={{ padding: 20 }}>
          <Button
            onClick={this.handleSetSelect}
            style={{ marginLeft: 8 }}
            type="danger"
            ghost
          >
            Set Select to USA from another component
          </Button>
        </Row>
        <Divider />
        <ReduxFormExample />
      </Container>
    );
  }
}
