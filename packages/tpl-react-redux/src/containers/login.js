import React from "react";
import { connect } from "react-redux";
import { Layout, Form, Row, Col, Icon, Input, Button, Checkbox } from "antd";

import { login } from "../actions";

import { Content } from "../components/layout";

const FormItem = Form.Item;

@Form.create()
@connect(state => ({}))
export default class Login extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(login(values));
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout>
        <Content>
          <Row>
            <Col span={12} offset={6}>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator("userName", {
                    rules: [{ required: true, message: "Please input your username!" }],
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                      placeholder="Username"
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("password", {
                    rules: [{ required: true, message: "Please input your Password!" }],
                  })(
                    <Input
                      prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
                      type="password"
                      placeholder="Password"
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("remember", {
                    valuePropName: "checked",
                    initialValue: true,
                  })(<Checkbox>Remember me</Checkbox>)}
                  <a className="login-form-forgot" href="">
                    Forgot password
                  </a>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                  </Button>
                  Or <a href="">register now!</a>
                </FormItem>
              </Form>
            </Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}
