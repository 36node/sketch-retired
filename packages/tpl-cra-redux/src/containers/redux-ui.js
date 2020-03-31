/**
 * Example redux-ui example
 */

import React, { Component, PureComponent } from "react";
import { isNil } from "lodash";
import { connect } from "react-redux";
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
import {
  makeProgress,
  makeProgressSelector,
  makeAssign,
  makeAssignSelector,
  makeToggle,
  makeToggleSelector,
} from "@36node/redux";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

import withBreadCrumb from "../components/withBreadCrumb";
import Container from "../components/layout/container";
import Jumbotron from "../components/layout/jumbotron";

const UI_KEY = "reduxUI";
const Option = Select.Option;

const progress = makeProgress(UI_KEY);
const progressSelector = makeProgressSelector(UI_KEY);
const assign = makeAssign(UI_KEY);
const assignSelector = makeAssignSelector(UI_KEY);
const toggle = makeToggle(UI_KEY);
const toggleSelector = makeToggleSelector(UI_KEY);

@connect(progressSelector)
class ProgressExample extends PureComponent {
  onIncrease = () => this.props.dispatch(progress.increase(5));
  onDecrease = () => this.props.dispatch(progress.decrease(5));
  onReset = () => this.props.dispatch(progress.reset());

  render() {
    return (
      <Row type="flex" align="middle">
        <Col span={2}>Progress Example:</Col>
        <Col span={5} offset={1}>
          <Progress type="circle" percent={this.props.pos} />
        </Col>

        <Col span={16}>
          <Button.Group>
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={this.onIncrease}
            >
              Increase
            </Button>
            <Button icon={<MinusOutlined />} onClick={this.onDecrease}>
              Decrease
            </Button>
            <Button type="danger" onClick={this.onReset}>
              Reset
            </Button>
          </Button.Group>
        </Col>
      </Row>
    );
  }
}

@connect(state => ({ vals: assignSelector(state) }))
class AssignExample extends Component {
  onValuesChange = (changedValues, allValues) => {
    console.log(changedValues);
    this.props.dispatch(assign(allValues));
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    const { vals } = this.props;

    return (
      <Row type="flex" align="middle">
        <Col span={2}>Assign Example:</Col>
        <Col span={8} offset={1}>
          <Form
            {...formItemLayout}
            initialValues={{ "some-number": 3 }}
            onValuesChange={this.onValuesChange}
          >
            <Form.Item
              name="select"
              label="Select"
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
              hasFeedback
            >
              <Select placeholder="Please select a country">
                <Option value="china">China</Option>
                <Option value="usa">U.S.A</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="select-multiple"
              label="Select[multiple]"
              rules={[
                {
                  required: true,
                  message: "Please select your favourite colors!",
                  type: "array",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Please select favourite colors"
              >
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            </Form.Item>

            <Form.Item name="some-number" label="SomeNumber">
              <InputNumber min={1} max={10} />
            </Form.Item>

            <Form.Item name="switch" label="Switch" valuePropName="checked">
              <Switch />
            </Form.Item>

            <Form.Item name="slider" label="Slider">
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
            </Form.Item>

            <Form.Item name="radio-group" label="Radio.Group">
              <Radio.Group>
                <Radio value="a">item 1</Radio>
                <Radio value="b">item 2</Radio>
                <Radio value="c">item 3</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Col>

        <Col offset={1} span={8}>
          {Object.keys(vals).map(k => {
            const val = isNil(vals[k]) ? "" : vals[k];

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

@connect(state => ({
  value: toggleSelector(state),
}))
class ToggleExample extends Component {
  onChange = () => this.props.dispatch(toggle());
  onOpen = () => this.props.dispatch(toggle(true));
  onClose = () => this.props.dispatch(toggle(false));

  render() {
    const { value } = this.props;

    return (
      <Row type="flex" align="middle">
        <Col span={2}>Toggle example:</Col>
        <Col span={3} offset={1}>
          <Switch checked={value} onChange={this.onChange} />
        </Col>
        <Col span={18}>
          <Button.Group>
            <Button disabled={value} onClick={this.onOpen} type="primary">
              ON
            </Button>
            <Button disabled={!value} onClick={this.onClose}>
              OFF
            </Button>
          </Button.Group>
        </Col>
      </Row>
    );
  }
}

@withBreadCrumb("UI-Example", "UI")
export default class ReduxUi extends Component {
  render() {
    return (
      <Container>
        <Jumbotron> Redux ui. </Jumbotron>
        <Divider />
        <ToggleExample />
        <Divider />
        <AssignExample />
        <Divider />
        <ProgressExample />
      </Container>
    );
  }
}
