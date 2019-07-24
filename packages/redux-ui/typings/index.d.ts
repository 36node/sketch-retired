import { Reducer, Action } from "redux";

namespace Base {
  class ReduxUiBase {
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
}

namespace Progress {
  // progress
  interface IncreaseAction extends Base.BaseAction {
    payload: {
      step: Number;
    };
  }

  interface DecreaseAction extends Base.BaseAction {
    payload: {
      step: Number;
    };
  }

  interface InitAction extends Base.BaseAction {
    payload: {
      step: Number;
    };
  }

  interface Options extends Base.BaseOpts {}

  interface InitialState {
    progress: {
      step: Number;
      min: Number;
      max: Number;
    };
  }

  interface Actions {
    increase: (step: Number, meta?: Object) => IncreaseAction;
    decrease: (step: Number, meta?: Object) => DecreaseAction;
    init: (
      step: Number,
      min: Number,
      max: Number,
      meta?: Object
    ) => IncreaseAction;
  }

  declare class Progress extends ReduxUiBase {
    actions: Actions;
  }
}

namespace Toggle {
  interface OpenAction extends BaseAction {}

  interface CloseAction extends BaseAction {}

  interface SetAction extends BaseAction {
    payload: {
      toggle: Boolean;
    };
  }

  interface Actions {
    close: (meta?: Object) => CloseAction;
    open: (meta?: Object) => OpenAction;
    set: (toggle: Boolean, meta?: Object) => SetAction;
  }

  interface Options extends BaseOpts {}

  interface InitialState {
    toggle: Boolean;
    meta?: Object;
  }
}

namespace Assign {
  interface SetAction extends BaseAction {
    payload: {
      assign: any;
    };
  }

  interface Actions {
    set: (assign: any, meta?: Object) => SetAction;
  }

  interface Options extends BaseOpts {}

  interface InitialState {
    assign: any;
    meta?: Object;
  }
}

declare module "@36node/redux-ui" {
  // progress
  export function createProgressActions(
    key: String,
    opts: Progress.Options
  ): Progress.Actions;

  export function isProgress(action: Base.BaseAction): Boolean;

  export function createProgressSelector(
    key: String,
    reduxPath?: String
  ): (state: Object) => Progress.InitialState;

  export const progressReducer: Reducer;

  export const ProgressTypes: {
    increase: String;
    decrease: String;
    init: String;
  };

  // toggle
  export function createToggleActions(
    key: String,
    opts: Toggle.Options
  ): ToggleActions;

  export const toggleReducer: Reducer;

  export function isToggle(action: BaseAction): Boolean;

  export function createToggleSelector(
    key: String,
    reduxPath?: String
  ): (state: Object) => Toggle.InitialState;

  export const ToggleTypes: {
    close: String;
    open: String;
    set: String;
  };

  // assin

  export function createAssignActions(
    key: String,
    opts?: Assign.Options
  ): Assign.Actions;

  export const assignReducer: Reducer;

  export function isAssign(action: BaseAction): Boolean;

  export function createAssignSelector(
    key: String,
    reduxPath?: String
  ): (state: Object) => Assign.InitialState;

  export const AssignTypes: {
    set: String;
  };

  export const reduxUiReducers: {
    toggles: Reducer;
    assigns: Reducer;
    progresses: Reducer;
  };
}
