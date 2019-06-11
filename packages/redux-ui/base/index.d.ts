export class ReduxUiBase {
  key: String;
  reduxPath: String;
}

interface BaseAction extends Action {
  meta?: Object;
  key: String;
}

interface BaseOpts {
  reduxPath?: String;
}
