import React from "react";
import { connect } from "react-redux";
import { Layout, Form, Icon, Input, Button, Checkbox } from "antd";
import styled from "styled-components";
import DocumentTitle from "react-document-title";

import { login } from "../actions";

import { Content } from "../components/layout";

const FormItem = Form.Item;

const LoginContainer = styled("div")`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
      <DocumentTitle title="@36node - Login">
        <Layout>
          <Content>
            <LoginContainer>
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
                    {getFieldDecorator("userName", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ],
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
                        placeholder="Username"
                      />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator("password", {
                      rules: [
                        {
                          required: true,
                          message: "Please input your Password!",
                        },
                      ],
                    })(
                      <Input
                        prefix={
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
                        }
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
            </LoginContainer>
          </Content>
        </Layout>
      </DocumentTitle>
    );
  }
}
