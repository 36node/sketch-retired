const initState = {
  request: {},
  loading: false,
  meta: {},
  result: {},
};

export default baseType => {
  const reducer = (
    state = initState,
    { type, payload = {}, error, meta = {} }
  ) => {
    switch (type) {
      case baseType:
        return { ...initState, loading: true, request: payload, meta };
      case baseType.success():
        return {
          ...state,
          loading: false,
          result: payload.result,
        };
      case baseType.failure():
        return {
          ...state,
          loading: false,
          error,
        };
      default:
        return state;
    }
  };

  return reducer;
};
