import React from "react";
import { Form, Icon, Input, Button, Checkbox, Layout } from "antd";
import styled from "styled-components";
import { createForm } from "@36node/redux-antd";

import Center from "../../components/layout/center";
import { auth } from "../../actions/api";
import { domain } from "../../constants";

const FormItem = Form.Item;
const login = auth.makeLogin(domain.session);

@createForm("login")
export default class Login extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { from = { pathname: "/" } } = this.props.location.state || {};
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(login({ body: values }, { from }));
      }
    });
  };

  fileds = {
    Username: ({ initialValue }) =>
      this.props.form.getFieldDecorator("username", {
        initialValue,
        rules: [
          {
            required: true,
            message: "Please input your username!",
          },
        ],
      })(
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Username"
        />
      ),
    Password: ({ initialValue }) =>
      this.props.form.getFieldDecorator("password", {
        initialValue,
        rules: [
          {
            required: true,
            message: "Please input your Password!",
          },
        ],
      })(
        <Input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password"
        />
      ),
    RememberMe: ({ initialValue }) =>
      this.props.form.getFieldDecorator("remember", {
        initialValue,
        valuePropName: "checked",
      })(<Checkbox>Remember me</Checkbox>),
  };

  render() {
    const { Username, Password, RememberMe } = this.fileds;

    return (
      <Layout>
        <Center>
          <LoginBox>
            <div className="login-logo">
              <img
                src="/images/logo.png"
                width="48px"
                height="48px"
                alt="logo"
              />
              <div>
                <div className="title">TEMPLATE-CRA-REDUX</div>
                <div className="subtitle">@36node</div>
              </div>
            </div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem>
                <Username />
              </FormItem>
              <FormItem>
                <Password />
              </FormItem>
              <FormItem>
                <RememberMe initialValue={true} />
                <a className="login-form-forgot" href="/">
                  Forgot password
                </a>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
                Or <a href="/">register now!</a>
              </FormItem>
            </Form>
          </LoginBox>
        </Center>
      </Layout>
    );
  }
}

const LoginBox = styled("div")`
  padding: 0px 24px 0 24px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;

  .login-logo {
    padding: 18px 0px;
    display: flex;
    align-items: center;

    div {
      margin-left: 12px;
      color: #5e9f7b;

      .title {
        font-size: 18px;
      }

      .subtitle {
        font-size: 14px;
      }
    }
  }

  .login-form {
    max-width: 300px;
  }

  .login-form-forgot {
    max-width: 300px;
  }

  .login-form-button {
    width: 100%;
  }
`;
