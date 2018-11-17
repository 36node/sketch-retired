import union from "lodash/union";

const initState = {
  loading: false,
  xTotalCount: 0,
  result: [],
  request: {},
  meta: {},
};

export default function paginate(base, append) {
  const reducer = (
    state = initState,
    { type, payload = {}, error, meta = {} }
  ) => {
    let { xTotalCount = 0, result = [] } = payload;
    result = append ? union(result, state.result) : result;
    switch (type) {
      case base:
        return { ...initState, loading: true, request: payload, meta };
      case base.success():
        return {
          ...state,
          loading: false,
          result,
          xTotalCount,
        };
      case base.failure():
        return { ...state, loading: false, error };
      default:
        return state;
    }
  };

  return reducer;
}
