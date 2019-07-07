# Redux form

An redux library for doing cron job

## Use

### Config redux

```js
import { cronReducer } from "@36node/redux-cron";

export default combineReducers({
  crons: cronReducer,
});
```

### Actions

```js
import { createCronActions } from "@36node/redux-cron";
import { put } from "redux-saga/effects";

const cronActions = createCronActions("SOME_KEY", {
  // onTick can be a fucntion or an action object
  onTick: function*(count, actions) {
    // count: current tick count
    // actions: cron actions

    if (count >= 10) {
      yield put(actions.stop());
    }
  },
});

// dispatch, interval 1s
dispatch(cronActions.start(1000));
```

```ts
export interface CronActions {
  start: (interval?: number, meta?: Object) => StartAction; // start cron
  stop: (meta?: Object) => StopAction; // stop cron
  cancel: (meta?: Object) => CancelAction; // reset cron, set count=0
}
```

### Redux state

```ts
export interface CronState {
  count: number; // tick count
  lastAt: string; // last tick at
  lastStartAt: string; // last start at
  lastStopAt: string; // last stop at
  interval: number; // current interval
  status: "STOP" | "RUNNING"; // current status
}
```

### Selectors

```js
import { createCronSelector } from "@36node/redux-cron";

// define
const selector = createCronSelector("SOME_KEY");

// use
const cronState = selector(state);
```
