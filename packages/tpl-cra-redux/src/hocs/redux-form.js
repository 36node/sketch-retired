/**
 * antd-form adapter
 */
import { Form } from "antd";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { mapValues } from "lodash";

/**
 * @param {import("@36node/redux-form").FormActions} actions
 * @param {import("@36node/redux-form").FormSelector} selector
 */
export default function createForm(actions, selector) {
  return Component => {
    class MyForm extends PureComponent {
      componentWillMount() {
        this.fields = [];
      }

      componentDidMount() {
        // register form fields
        this.props.dispatch(actions.registerMutilFields(this.fields));
      }

      /**
       * overwrite antd getFieldDecorator
       * @param {String} id
       * @param {import("antd/lib/form/Form").GetFieldDecoratorOptions} options
       */
      getFieldDecorator = (id, options = {}) => {
        const { form } = this.props;

        // register field to redux-form
        const { initialValue, ...rest } = options;

        this.fields.push({ name: id, initialValue });

        return form.getFieldDecorator(id, rest);
      };

      render() {
        const { form, fields, dispatch } = this.props;

        return (
          <Component
            form={form}
            getFieldDecorator={this.getFieldDecorator}
            fields={fields}
            dispatch={dispatch}
          />
        );
      }
    }

    const WithAntdForm = Form.create({
      mapPropsToFields: props => {
        // redux to ui
        const { fields = {} } = props;

        return mapValues(fields, f => Form.createFormField({ ...f }));
      },
      onFieldsChange: (props, fields = {}) => {
        // ui to redux
        props.dispatch(
          actions.changeMutilFields(Object.keys(fields).map(k => fields[k]))
        );
      },
    })(MyForm);

    const WithRedux = connect(state => {
      const formState = selector(state);

      return { fields: formState.fields };
    })(WithAntdForm);

    return WithRedux;
  };
}
