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

  /** ability to inject saga and reducer dynamically, not ready for production */
  store.runSaga = saga => {
    sagaMiddleware.run(saga, store.getState);
  };
  store.runReducer = reducers => {
    store.replaceReducer(combineReducers({ ...rootReducers, ...reducers }));
  };

  return store;
}
