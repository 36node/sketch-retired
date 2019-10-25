import { FormComponentProps, FormCreateOption } from "antd/lib/form/Form";
import { ColumnProps } from "antd/lib/table";
import { FormWrappedProps } from "antd/lib/form/interface";
import { Action } from "redux";

type Selector = (state: object) => object;

interface CreateTableOptions {
  defaultPageSize: number; // default 10
  columns: [ColumnProps<any>];
  list: Action;
  listSelector: Selector;
}

export const createForm: <TOwnProps extends FormComponentProps<any>>(
  key?: string
) => FormWrappedProps<TOwnProps>;

export const createTable: <TOwnProps extends FormComponentProps<any>>(
  key?: string,
  options: CreateTableOptions
) => FormWrappedProps<TOwnProps>;
