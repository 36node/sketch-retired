# @36node/Redux

[![version][0]][1] [![downloads][2]][3]

A set of predefined actions, reducers, selectors and sagas for 36node team.

@36node/redux 将会有较大改动。注意避雷。

## Assign

Save any value to redux.

### Assign Action

```js
import { makeAssign } from "@36node/redux";

const assign = makeAssign("someKey");

// set value
dispath(assign(someValue));
```

### Assign Reducer

```js
import { assignReducerRoot } from "@36node/redux";

export default combineReducers({
  ...assignReducerRoot,
});
```

### Assign Selector

```js
import { makeAssignSelector } from "@36node/redux";

// selector maker
const select = makeAssignSelector("someKey");
const some = select(state);
```

## Toggle

Toggle usually works as a swither, open or close.

### Toggle Action

```js
import { makeToggle } from "@36node/redux";

const toggle = makeToggle("someKey");

// switch to true or false
dispath(toggle());
// switch to true
dispath(toggle(true));
// switch to false
dispath(toggle(false));
```

### Toggle Reducer

```js
import { toggleReducerRoot } from "@36node/redux";

export default combineReducers({
  ...toggleReducerRoot,
});
```

### Toggle Selector

```js
import { makeToggleSelector } from "@36node/redux";

// selector maker
const select = makeToggleSelector("someKey");
const some = select(state);
```

## Progress

Represent an progress logic in redux.

### Progress Actions

```js
import { makeProgress } from "@36node/redux";

const progress = makeProgress("someKey");

// increase action, default step = 1
dispatch(progressActions.increase(5));
// decrease action, default step = 1
dispatch(progressActions.decrease(5));
// init action, default params: pos: 0, step = 1, min = 0, max = 100
dispatch(progressActions.reset({pos: 0 step: 1, min: 0, max: 100}));
```

### Progress Reducer

```js
import { progressReducerRoot } from "@36node/redux";

export default combineReducers({
  ...progressReducerRoot,
});
```

### Progress Selector

```js
import { makeProgressSelector } from "@36node/redux";

const select = makeProgressSelector("someKey");

// state: {pos, step, min, max}
const some = select(state);
```

## Form

Form in redux.

### Form Actions

```js
import { makeForm } from "@36node/redux";

const form = makeForm("someKey");

// reset form to initState, or payload
dispatch(form.reset(payload = {}, meta));
// save form fields
dispatch(form.saveFields({ field1: {value: "x", name: "name"}, field2: {...} }));
```

### Form Reducer

```js
import { formReducerRoot } from "@36node/redux";

export default combineReducers({
  ...formReducerRoot,
});
```

### Form Selector

```js
import { makeFormSelector } from "@36node/redux";

const select = makeFormSelector("someKey");
const some = select(state);
```

## Api

Redux-api is a library which can easily write client to communicate with backends. It generates actions and selectors for making ajax calls to API endpoint. Also, it use saga to change ajax state and save result in redux store with few config.

### Api Actions

createApiMaker: It is a creator of api actions maker.

```js
import { createApiMaker, makeApiTypes } from "@36node/redux";

const STORE_LIST_PETS = makeApiTypes("STORE_LIST_PETS");
const makeListPets = createApiMaker(
  STORE_LIST_PETS,
  sdk.petstore.pet.listPets,
  [petSchema]
);

const listPets = makeListPets("someKey");

// list pets from service
dispatch(listPets({ query: {} }));
```

### Api Reducer

```js
import { apiReducerRoot } from "@36node/redux";

export default combineReducers({
  ...apiReducerRoot,
});
```

### Api Selector

```js
import { makeApiSelector } from "@36node/redux";

const select = makeApiSelector("someKey");
const some = select(state);
```

### Api Saga

`redux/api` should use with saga.

```js
import { fork, all } from "redux-saga/effects";
import { watchApi } from "@36node/redux";

export default function* root() {
  yield all([fork(watchApi)]);
}
```

### Write an endpoint function of an api

```js
import fetch from "@36node/fetch";

// endpoint function param is request action payload
function listPetsEndpoint(req) {
  const { query, headers } = req;

  // also can user other ajax tools, should return a promise
  return fetch(`${some_url}/pets`, {
    method: "get",
    query,
    headers,
  });
}
```

## Cron

An redux library for cron like logic, which can be used for:

- scheduled job
- trigger progress auto increase or decrease
- timeline, like player control

### Cron Actions

```js
import { makeCron } from "@36node/redux";

const cron = makeCron("someKey");

// start cron
dispatch(cron.start({ pos: 0, min: 0, max: 100, step: 1 }));
// stop cron
dispatch(cron.stop);
// reset cron
dispatch(cron.reset({ pos: 0, min: 0, max: 100, step: 1 }));
// tick cron
dispatch(cron.tick({ pos: 5, tickedAt: new Date().getTime() }));
```

### Cron Reducer

```js
import { cronReducerRoot } from "@36node/redux";

export default combineReducers({
  ...cronReducerRoot,
});
```

### Cron Selector

```js
import { makeCronSelector } from "@36node/redux";

const select = makeCronSelector("someKey");
const some = select(state);
```

### Cron Saga

`redux/cron` should use with saga.

```js
import { fork, all } from "redux-saga/effects";
import { watchCron } from "@36node/redux";

export default function* root() {
  yield all([fork(watchCron)]);
}
```

## Helper saga

watchHelper saga should be configured in saga, if we want to use tap and reput.

```js
import { fork, all } from "redux-saga/effects";
import { watchHelper } from "@36node/reudx";

export default function* root() {
  yield all([fork(watchHelper)]);
}
```

## Other Apis

- `isAction(pattern, key): checker(action)`: return an action checker.
- `makeAction(type, keyPattern, initPayload, initMeta): action(payload, meta)`: return an action creator.
- `makeReducer(is, reducer): reducer(state)`: `is` is an action checker, reducer is a sub reducer.
- `makeSelector(key, initState): select(state)`: return a selector.
- `rePut(action)`: rePut is a saga effect, used to re dispatch an action which has `meta.rePut == true`
- `tapOn(type, key, saga)`: low level tap function, to trigger saga for given type and key.
- `watchHelper`: helper for tap and reput saga

[0]: https://img.shields.io/npm/v/@36node/redux.svg?style=flat
[1]: https://npmjs.com/package/@36node/redux
[2]: https://img.shields.io/npm/dm/@36node/redux.svg?style=flat
[3]: https://npmjs.com/package/@36node/redux
