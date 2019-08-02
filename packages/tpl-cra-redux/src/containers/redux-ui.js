/**
 * Example redux-ui example
 */

import React, { Component, PureComponent } from "react";
import DocumentTitle from "react-document-title";
import { connect } from "react-redux";
import { isNil } from "lodash";
import {
  Switch,
  Row,
  Col,
  Button,
  Form,
  Select,
  InputNumber,
  Slider,
  Radio,
  Divider,
  Progress,
} from "antd";

import Layout from "../components/layout";

import { reduxUiActions } from "../actions";
import { reduxUiSelectors } from "../selectors";

const Option = Select.Option;
const { Container, Jumbotron } = Layout;

@connect(state => {
  const step = reduxUiSelectors.progressExample(state).step;

  return {
    step,
  };
})
class ProgressExample extends PureComponent {
  onIncrease = () => {
    this.props.dispatch(reduxUiActions.progressExample.increase(5));
  };

  onDecrease = () => {
    this.props.dispatch(reduxUiActions.progressExample.decrease(5));
  };

  onReset = () => {
    this.props.dispatch(reduxUiActions.progressExample.init());
  };

  render() {
    return (
      <Row type="flex" align="middle">
        <Col span={2}>Progress Example:</Col>

        <Col span={4} offset={1}>
          <Progress type="circle" percent={this.props.step} />
        </Col>

        <Col span={2}>
          <Button icon="plus" type="primary" onClick={this.onIncrease}>
            Increase
          </Button>
        </Col>
        <Col span={2}>
          <Button icon="plus" onClick={this.onDecrease}>
            Decrease
          </Button>
        </Col>
        <Col span={2}>
          <Button type="danger" onClick={this.onReset}>
            Reset
          </Button>
        </Col>
      </Row>
    );
  }
}

@connect(state => {
  const assign = reduxUiSelectors.assignExample(state).assign;

  return {
    assign,
  };
})
@Form.create({
  onValuesChange: (props, changedValues, allValues) => {
    props.dispatch(reduxUiActions.assignExample.set(allValues));
  },
})
class AssignExample extends Component {
  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const { getFieldDecorator } = this.props.form;
    const { assign = {} } = this.props;
    return (
      <Row type="flex" align="middle">
        <Col span={2}>Assign Example:</Col>
        <Col span={8} offset={1}>
          <Form {...formItemLayout}>
            <Form.Item label="Select" hasFeedback>
              {getFieldDecorator("select", {
                rules: [
                  { required: true, message: "Please select your country!" },
                ],
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
          </Form>
        </Col>

        <Col offset={1} span={8}>
          {Object.keys(assign).map(k => {
            const val = isNil(assign[k]) ? "" : assign[k];

            return (
              <Row key={k} style={{ padding: 20 }}>
                <Col span={10}>{k}:</Col>
                <Col span={14}>{val.toString()}</Col>
              </Row>
            );
          })}
        </Col>
      </Row>
    );
  }
}

@connect(state => {
  const toggle = reduxUiSelectors.toggleExample(state).toggle;

  return {
    toggle,
  };
})
class ToggleExample extends Component {
  onChange = checked => {
    this.props.dispatch(reduxUiActions.toggleExample.set(checked));
  };

  onOpen = () => {
    this.props.dispatch(reduxUiActions.toggleExample.open());
  };

  onClose = () => {
    this.props.dispatch(reduxUiActions.toggleExample.close());
  };

  render() {
    const { toggle } = this.props;

    return (
      <Row type="flex" align="middle">
        <Col span={2}>Toggle example:</Col>

        <Col span={2} offset={1}>
          <Switch value={toggle} onChange={this.onChange} />
        </Col>

        <Col span={3}>
          <Button disabled={toggle} onClick={this.onOpen} type="primary">
            Open Toggle
          </Button>
        </Col>

        <Col span={3}>
          <Button disabled={!toggle} onClick={this.onClose}>
            Close Toggle
          </Button>
        </Col>
      </Row>
    );
  }
}

@connect(state => {
  return {};
})
export default class ReduxUi extends Component {
  render() {
    return (
      <DocumentTitle title="@36node - Redux Ui Example">
        <Container>
          <Jumbotron> Redux ui. </Jumbotron>

          <Divider />

          <ToggleExample />

          <Divider />

          <AssignExample />

          <Divider />

          <ProgressExample />
        </Container>
      </DocumentTitle>
    );
  }
}
