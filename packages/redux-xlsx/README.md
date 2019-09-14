# @36node/redux-xlsx

[![version][0]][1] [![downloads][2]][3]

Work with Xlsx and redux, focus on manage xlsx data in state, import from file to state, and export from state to file.

## Xlsx Actions

```js
import { makeXlsx } from "@36node/redux";

/**
 * columns structure same as antd table, ref
 * https://ant.design/components/table-cn/#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8
 */
const xlsx = makeXlsx("someKey", { columns });

// start cron
dispatch(xlsx.import({ file }));
// stop xlsx
dispatch(xlsx.export({ rows }));
```

## Xlsx Reducer

```js
import { xlsxReducerRoot } from "@36node/redux";

export default combineReducers({
  ...xlsxReducerRoot,
});
```

## Xlsx Selector

```js
import { makeXlsxSelector } from "@36node/redux";

const select = makeXlsxSelector("someKey");
const some = select(state);
```

## Xlsx Saga

`redux-xlsx` should use with saga.

```js
import { fork, all } from "redux-saga/effects";
import { watchXlsx } from "@36node/redux-xlsx";

export default function* root() {
  yield all([fork(watchXlsx)]);
}
```

[0]: https://img.shields.io/npm/v/@36node/redux-xlsx.svg?style=flat
[1]: https://npmjs.com/package/@36node/redux-xlsx
[2]: https://img.shields.io/npm/dm/@36node/redux-xlsx.svg?style=flat
[3]: https://npmjs.com/package/@36node/redux-xlsx
