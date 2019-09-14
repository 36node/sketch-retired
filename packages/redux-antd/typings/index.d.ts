import { FormComponentProps, FormCreateOption } from "antd/lib/form/Form";
import { FormWrappedProps } from "antd/lib/form/interface";

export const createForm: <TOwnProps extends FormComponentProps<any>>(
  key?: string
) => FormWrappedProps<TOwnProps>;
