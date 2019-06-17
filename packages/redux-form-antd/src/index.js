import React, { PureComponent } from "react";
import { Form } from "antd";
import { connect } from "react-redux";
import { mapValues } from "lodash";
import { createFormActions, createFormSelector } from "@36node/redux-form";

export default function createForm(formName) {
  const actions = createFormActions(formName);
  const selector = createFormSelector(formName);

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

      changeField = (fieldName, field = {}) => {
        this.props.dispatch(actions.changeField(fieldName, field));
      };

      reset = initialValues => {
        this.props.dispatch(actions.reset(initialValues));
      };

      render() {
        const { form, fields, dispatch, ...rest } = this.props;

        return (
          <Component
            form={form}
            getFieldDecorator={this.getFieldDecorator}
            reset={this.reset}
            changeField={this.changeField}
            fields={fields}
            dispatch={dispatch}
            {...rest}
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
