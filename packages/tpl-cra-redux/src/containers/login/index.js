import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, Checkbox, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";

import Center from "../../components/layout/center";
import { auth } from "../../actions/api";
import { domain } from "../../constants";

const login = auth.makeLogin(domain.session);

const Username = () => (
  <Form.Item
    name="username"
    rules={[
      {
        required: true,
        message: "Please input your username!",
      },
    ]}
  >
    <Input
      prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
      placeholder="Username"
    />
  </Form.Item>
);

const Password = () => (
  <Form.Item
    name="password"
    rules={[
      {
        required: true,
        message: "Please input your password!",
      },
    ]}
  >
    <Input
      prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
      type="password"
      placeholder="Password"
    />
  </Form.Item>
);

const RememberMe = () => (
  <Form.Item name="remember" valuePropName="checked" noStyle>
    <Checkbox>Remember me</Checkbox>
  </Form.Item>
);

@connect()
export default class Login extends React.PureComponent {
  handleLogin = values => {
    const { from = { pathname: "/" } } = this.props.location.state || {};
    this.props.dispatch(
      login({ body: values }, { from, remember: values.remember })
    );
  };

  render() {
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
            <Form
              onFinish={this.handleLogin}
              className="login-form"
              initialValues={{ remember: true }}
            >
              <Username />
              <Password />
              <RememberMe />
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              <a className="login-form-forgot" href="/">
                Forgot password
              </a>
              Or <a href="/">register now!</a>
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
    margin-right: 5px;
  }

  .login-form-button {
    width: 100%;
  }
`;
