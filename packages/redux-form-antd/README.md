# Redex From Antd

A HOC for antd form, to connect @36node/redux-form

## Install

```sh
$ yarn install @36node/redux-form
```

## Use

```js
import React, { PureComponent } from "react";
import createForm from "@36node/redux-form-antd";

@createForm("SAMPLE_FORM")
class MyForm extends PureComponent {
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
    this.props.reset(initialValues);
  };
}
```

### Api

```ts
import {
  WrappedFormInternalProps,
  GetFieldDecoratorOptions,
} from "antd/lib/form/Form";

import { FieldState, Fields } from "@36node/redux-form";
import { DispatchProp } from "react-redux";

export interface ReduxFormAntdProps
  extends WrappedFormInternalProps,
    DispatchProp {
  // overwrite antd.Form.getFieldDecorator
  getFieldDecorator: (
    id: String,
    options: GetFieldDecoratorOptions
  ) => (node: React.ReactNode) => React.ReactNode;
  // reset form with initial values
  reset: (initialValues: Object) => void;
  // change form field value by name
  changeField: (fieldName: String, field: FieldState) => void;
  // fields
  fields: Fields;
}
```
