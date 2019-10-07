import React, { Fragment } from "react";
import { Form } from "antd";
import { isPlainObject, mapValues } from "lodash";
import { connect, makeForm, makeFormSelector } from "@36node/redux";

function flatFields(ob) {
  let result = {};
  for (const p in ob) {
    const node = ob[p];
    if (isPlainObject(node)) {
      if ("name" in node) {
        // filed 节点
        result[node.name] = { ...node };
      } else {
        // nested data
        result = { ...result, ...flatFields(node) };
      }
    }
  }
  return result;
}

export function createForm(key) {
  const actions = makeForm(key);
  const selector = makeFormSelector(key);

  class BasicForm extends React.PureComponent {
    componentWillUnmount() {
      this.props.dispatch(actions.reset());
    }

    render() {
      const { children, ...rest } = this.props;

      var childrenWithProps = React.Children.map(children, child =>
        React.cloneElement(child, { ...rest })
      );

      return <Fragment>{childrenWithProps}</Fragment>;
    }
  }

  const AntdForm = Form.create({
    name: key,
    mapPropsToFields(props) {
      const { formData = {} } = props;
      return mapValues(formData.fields, f => Form.createFormField({ ...f }));
    },
    onFieldsChange(props, fields) {
      props.dispatch(actions.saveFields(flatFields(fields)));
    },
  })(BasicForm);

  const ConnectedForm = connect((state, props) => ({
    formData: selector(state),
  }))(AntdForm);

  return Component => props => {
    return (
      <ConnectedForm>
        <Component {...props} />
      </ConnectedForm>
    );
  };
}
