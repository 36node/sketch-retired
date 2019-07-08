import { isCron, TYPES } from "./action";
import { put, call, fork, cancel, take, select } from "redux-saga/effects";
import { Crons } from "./crons";
import { createCronSelector } from "./selector";
import { eventChannel } from "redux-saga";

// cache tick task
const tickTasks = new Map();

function createTickChannel(interval) {
  let count = 0;
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      // 发送 count
      emitter(++count);
    }, interval);

    return () => {
      clearInterval(iv);
    };
  });
}

/**
 * Handle tick
 * @param {import("redux-saga").Channel} chan
 * @param {import(".").Cron} cron
 */
function* handleTick(chan, cron) {
  const selector = createCronSelector(cron.key, cron.reduxPath);

  while (true) {
    yield take(chan);

    const onTick = cron.onTick;

    // onTick is an action
    if (typeof onTick === "object") {
      yield put(onTick);
    }

    // onTick is an saga
    if (typeof onTick === "function") {
      const state = yield select(selector);
      yield call(onTick, state.count, cron.actions);
    }

    yield put({
      type: TYPES.TICK,
      key: cron.key,
    });
  }
}

export default function* watchCron() {
  while (true) {
    const action = yield take(isCron);

    const { type, key, payload = {} } = action;

    if (!Crons.has(key)) continue;

    const cron = Crons.get(key);

    switch (type) {
      case TYPES.START:
        if (!tickTasks.has(key)) {
          const { interval } = payload;

          const chan = yield call(createTickChannel, interval);

          const task = yield fork(handleTick, chan, cron);

          tickTasks.set(key, {
            chan,
            task,
          });
        }
        break;
      case TYPES.STOP:
      case TYPES.CANCEL:
        if (tickTasks.has(key)) {
          const { chan, task } = tickTasks.get(key);
          chan.close();
          yield cancel(task);
          tickTasks.delete(key);
        }
        break;
      default:
        break;
    }
  }
}
