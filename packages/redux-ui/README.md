# Redux ui

[![version][0]][1] [![downloads][2]][3]

## Use

### Config redux:

```js
import { reduxUiReducers } from "@36node/redux-ui";

combineReducers({
  ...reduxUiReducers,
});
```

## Assign

Save any value to redux.

### actions:

```js
import { createAssignActions } from "@36node/redux-ui/assign";

const assignActions = createToggleActions("someKey");

// set action: set value
dispath(assignActions.set(someValue));
```

### selector:

```js
import { createAssignSelector } from "@36node/redux-ui/assign";

// selector maker
const selector = createAssignSelector("someKey");

const assign = selector(state).assign;
```

## Toggle

Open or close a toggle to redux.

### actions:

```js
import { createToggleActions } from "@36node/redux-ui/toggle";

const toggleActions =  createToggleActions("someKey"),

// open toggle action
dispath(toggleActions.open());

// close toggle action
dispath(toggleActions.close());

// set toggle action
dispath(toggleActions.set(true or false));

```

### selector:

```js
import { createToggleSelector } from "@36node/redux-ui/toggle";

// selector maker
const selector = createToggleSelector("someKey");

const toggle = selector(state).toggle;
```

## Progress

Represent an progress logic in redux.

### actions:

```js
import { createProgressActions } from "@36node/redux-ui/progress";

const progressActions = createProgressActions("someKeys");

// increase action, default step = 1
dispatch(progressActions.increase(5));
// decrease action, default step = 1
dispatch(progressActions.decrease(5));
// init action, default params: step = 1, min = 0, max = 100
dispatch(progressActions.init(1, 0, 100));
```

### selector:

```js
import { createProgressSelector } from "@36node/redux-ui/progress";

const selector = createProgressSelector("someKey");

// progressState: {step, min, max}
const progressState = selector(state);
```

[0]: https://img.shields.io/npm/v/@36node/redux-ui.svg?style=flat
[1]: https://npmjs.com/package/@36node/redux-ui
[2]: https://img.shields.io/npm/dm/@36node/redux-ui.svg?style=flat
[3]: https://npmjs.com/package/@36node/redux-ui
