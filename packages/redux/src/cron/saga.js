import { eventChannel, END } from "redux-saga";
import { put, call, fork, take, select } from "redux-saga/effects";

import { isCron, cronTypes, makeCron } from "./action";
import { makeCronSelector } from "./selector";
import { tapOn } from "../lib";

class Cron {
  // _chan;
  // _key;
  // _state = initState;

  constructor(key) {
    if (!key) throw new Error("cron must have a key");
    this._key = key;
    this._actions = makeCron(key);
  }

  set state(obj) {
    this._state = obj;
  }

  createChannel(interval = 1000) {
    return eventChannel(emitter => {
      const iv = setInterval(() => {
        const state = this._state;
        if (state.pos < state.max) {
          emitter(state.pos + state.step);
        } else {
          emitter(END);
        }
      }, interval);

      return () => {
        clearInterval(iv);
      };
    });
  }

  *start({ interval } = {}) {
    if (!this._chan) {
      this._chan = yield call([this, this.createChannel], interval);
      try {
        while (true) {
          let pos = yield take(this._chan);
          yield put(
            this._actions.tick({
              pos,
              tickedAt: new Date().getTime(),
            })
          );
        }
      } finally {
        if (this._state.running) {
          yield put(this._actions.stop());
          yield put(this._actions.reset());
        }
        delete this._chan;
      }
    }
  }

  stop() {
    if (this._chan) {
      this._chan.close();
    }
  }
}

const map = new Map();

const getCron = key => {
  if (map.has(key)) return map.get(key);
  const cron = new Cron(key);
  map.set(key, cron);
  return cron;
};

/**
 * tap on cron tick
 */
export const tapCronTick = (key, saga) => tapOn(cronTypes.TICK, key, saga);

/**
 * watch cron
 */
export function* watchCron() {
  while (true) {
    const action = yield take(isCron);
    const { type, key, payload } = action;

    if (!key) continue;
    const cron = getCron(key);
    const state = yield select(makeCronSelector(key));
    cron.state = state;

    switch (type) {
      case cronTypes.START:
        yield fork([cron, cron.start], payload);
        break;
      case cronTypes.STOP:
        cron.stop();
        break;
      default:
        break;
    }
  }
}
