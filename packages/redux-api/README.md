# redux-api

Redux-api is a library which can easily write client to communicate with backends. It generates actions and selectors for making ajax calls to API endpoint. Also, it use saga to change ajax state and save result in redux store with few config.

## Use

### Config reducer

Redux-api provide two reducers: Api reducer and Entities reducer;

Api reducer store api state: result, loading, request
Entities reducer store entities of normalizr

```js
// reducer.js
import { combineReducers } from "redux";

import entities from "./entity";
import { apiReducers } from "@36node/redux-api";

/**
 * apiReducers: {api: apiReducer, entities: entitiesReducer}
 * */
export default combineReducers({
  ...apiReducers,
});
```

### Config saga

```js
// saga.js
import { fork, all } from "redux-saga/effects";
import { watchApis } from "@36node/redux-api";

export default function* root() {
  yield all([fork(watchApis)]);
}
```

### Write an endpoint function of an api

```js
import fetch from "@36node/fetch";

// endpoint function param is request action payload
function listPetsEndpoint(payload) {
  const { query, headers } = req;

  // also can user other ajax tools, should return a promise
  return fetch(`${some_url}/pets`, {
    method: "get",
    query,
    headers,
  });
}
```

### Register api in actions

```js
// actions.js
import { createApiAction } from "@36node/redux-api";

export const listPets = createApiActions("LIST_PETS", {
  // schema for normalizr
  schema: [petSchema],
  endpoint: listPetsEndpoint,
});
```

### Dispatch action

```js
import {listPets} from 'actions'

...

fetchPets = () => {
  // dispatch a request action
  this.props.dispatch(listPets.request({query: {limit: 10, offset: 0}}));
}

refreshPets = () => {
  // refresh action means repeat last request action
  this.props.dispatch(listPets.refresh());
}

clearPets = () => {
  // clear action means clear api state in store
  this.props.dispatch(listPets.clear());
}
...
```

### Select api state

```js
import React from "react";
import { connect } from "redux-react";
import { apiSelector } from "@36node/redux-api";

@connect(state => {
  const listPetsState = apiSelector("LIST_PETS")(state);

  return {
    loading: listPetsState.loading,
    pets: listPetsState.result || [],
  };
})
class SomeContainer extends React.Component {}
```
