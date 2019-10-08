import createSagaMiddleware from "redux-saga";
import { combineReducers, createStore, applyMiddleware, compose } from "redux";

export function configureStore(rootReducers) {
  const sagaMiddleware = createSagaMiddleware();
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    combineReducers(rootReducers),
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  /** for code splitting */
  store.runSaga = sagaMiddleware.run;
  store.runReducer = reducers => {
    store.replaceReducer(combineReducers({ ...rootReducers, ...reducers }));
  };

  return store;
}
