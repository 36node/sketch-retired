import { combineReducers } from "redux";

import entities from "./entity";
import fetching from "./fetching";
import paginate from "./paginate";
import * as cs from "../constants";

const compose = (f, g) => (a, b) => f(g(a, b), b);

const session = compose(
  fetching(cs.LOGIN),
  fetching(cs.LOGOUT)
);

const paginators = combineReducers({
  repo: paginate(cs.LIST_REPOS),
  pet: paginate(cs.LIST_PETS),
});

export default combineReducers({
  session,
  entities,
  paginators,
});
