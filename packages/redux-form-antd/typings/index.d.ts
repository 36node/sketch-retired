import * as React from "react";
import {
  WrappedFormInternalProps,
  GetFieldDecoratorOptions,
} from "antd/lib/form/Form";
import { FieldState, Fields } from "@36node/redux-form";
import { DispatchProp } from "react-redux";

export interface ReduxFormAntdProps
  extends WrappedFormInternalProps,
    DispatchProp {
  getFieldDecorator: (
    id: String,
    options: GetFieldDecoratorOptions
  ) => (node: React.ReactNode) => React.ReactNode;
  reset: (initialValues: Object) => void;
  changeField: (fieldName: String, field: FieldState) => void;
  fields: Fields;
}

declare class ReduxFormAntd extends React.PureComponent<ReduxFormAntdProps> {}

export default function createForm(
  formName: String
): (Component: React.Component) => ReduxFormAntd;
