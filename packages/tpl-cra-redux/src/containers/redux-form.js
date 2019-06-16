import React, { PureComponent } from "react";
import DocumentTitle from "react-document-title";
import { Container, Jumbotron } from "../components/layout";

import {
  Switch,
  Form,
  Select,
  InputNumber,
  Slider,
  Radio,
  Divider,
  Button,
} from "antd";

import createForm from "../hocs/redux-form";
import { reduxFormActions } from "../actions";
import { reduxFormSelectors } from "../selectors";

const Option = Select.Option;

// use hoc to bind antd form and redux-form
@createForm(reduxFormActions.formExample, reduxFormSelectors.formExample)
class ReduxFormExample extends PureComponent {
  render() {
    // do not use form.getFieldDecorator
    const { getFieldDecorator } = this.props;
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
          {getFieldDecorator("slider")(
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
          {getFieldDecorator("radio-group")(
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

          <Button
            style={{ marginLeft: 8 }}
            onClick={() => {
              this.handleReset({
                select: "usa",
                "radio-group": "c",
                switch: true,
                slider: 60,
                "number-input": 4,
                "select-multiple": ["red"],
              });
            }}
            type="danger"
          >
            Reset(with initial value)
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
    this.props.dispatch(reduxFormActions.formExample.reset(initialValues));
  };
}

export default class ReduxForm extends PureComponent {
  render() {
    return (
      <DocumentTitle title="@36node - ">
        <Container>
          <Jumbotron> Redux Form. </Jumbotron>

          <Divider />

          <ReduxFormExample />
        </Container>
      </DocumentTitle>
    );
  }
}
