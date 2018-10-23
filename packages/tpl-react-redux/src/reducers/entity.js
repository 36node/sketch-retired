import mergeWith from "lodash/mergeWith";
import isArray from "lodash/isArray";

const initState = {
  repos: {},
  pets: {},
};

const customizer = (objValue, srcValue, key, object, source, stack) => {
  if (stack.size === 2) {
    // will not merge array
    if (isArray(srcValue)) {
      return srcValue;
    }
  }
};

// Updates an entity cache in payload to any action with payload.entities.
export default function entities(state = initState, action) {
  if (action.payload && action.payload.entities) {
    return mergeWith({}, state, action.payload.entities, customizer);
  }

  return state;
}
