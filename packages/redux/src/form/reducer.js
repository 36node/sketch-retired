import { isForm, formTypes } from "./action";
import { makeReducer } from "../lib";

export const initState = {
  fields: {},
};

function r(state = initState, action = {}) {
  // TODO: 有一些属性可以放到 meta 里，增强 form 的能力
  const { type, payload = {} /*, meta = {}*/ } = action;

  switch (type) {
    case formTypes.RESET:
      return {
        ...state,
        fields: {},
      };
    case formTypes.SAVE_FIELDS:
      return {
        ...state,
        fields: { ...state.fields, ...payload },
      };
    default:
      return state;
  }
}

export const formReducerRoot = {
  form: makeReducer(isForm, r),
};
