import { isXlsx, TYPES } from "./action";
import { Xlsxs } from "./xlsxs";
import { clone, setWith, get } from "lodash";

export const NOT_STARTED = "NOT_STARTED"; // import not begin
export const ERROR = "ERROR"; // file read error
export const IMPORTING = "IMPORTING"; // is importing
export const FINISHED = "FINISHED"; // import finshed
export const PAUSE = "PAUSE"; // import pause

export const ImportStatus = {
  NOT_STARTED,
  ERROR,
  IMPORTING,
  FINISHED,
  PAUSE,
};

export const initState = {
  import: {
    total: 0, // total record count
    count: 0, // current importted count
    status: NOT_STARTED, // import status
    error: undefined, // file error or other error
  },
  export: {
    loading: false,
  },
};

function r(state = initState, action = {}) {
  const { payload = {}, type } = action;

  switch (type) {
    case TYPES.SET_EXPORT_STATE:
      return {
        ...state,
        export: {
          ...state.export,
          ...payload,
        },
      };
    case TYPES.SET_IMPORT_STATE:
      return {
        ...state,
        import: {
          ...state.import,
          ...payload,
        },
      };
    case TYPES.IMPORT_PAUSE: {
      return {
        ...state,
        import: {
          ...state.import,
          status: PAUSE,
        },
      };
    }
    case TYPES.IMPORT_HANDLE_RESULT: {
      return {
        ...state,
        import: {
          ...state.import,
          count: state.import.count + 1,
        },
      };
    }
    case TYPES.IMPORT_RESET: {
      return {
        ...state,
        import: { ...initState.import },
      };
    }
    default:
      return state;
  }
}

export default function reducer(state = {}, action) {
  if (!isXlsx(action)) return state;

  const { key } = action;

  const xlsx = Xlsxs.get(key);

  if (!xlsx) return state;

  return setWith(
    { ...state },
    xlsx.reduxPath,
    r(get(state, xlsx.reduxPath), action),
    clone
  );
}
