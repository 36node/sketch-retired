import { FormComponentProps, FormCreateOption } from "antd/lib/form/Form";
import { FormWrappedProps } from "antd/lib/form/interface";

interface CreateTableOptions {
  defaultPageSize: string;
  apiMaker: Function;
}

export const createForm: <TOwnProps extends FormComponentProps<any>>(
  key?: string
) => FormWrappedProps<TOwnProps>;

export const createTable: <TOwnProps extends FormComponentProps<any>>(
  key?: string,
  options: CreateTableOptions
) => FormWrappedProps<TOwnProps>;
