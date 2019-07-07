import { isCron, TYPES } from "./action";
import { Crons } from "./crons";
import { clone, setWith, get } from "lodash";
import moment from "moment";

export const STOP = "STOP";
export const RUNNING = "RUNNING";

export const CronStatus = {
  STOP,
  RUNNING,
};

export const initState = {
  count: 0, // 当前corn 被执行了几次
  lastAt: undefined, // 最后一次执行的时间
  lastStartAt: undefined, // 最后一次开始时间
  lastStopAt: undefined, // 最后一次结束时间
  interval: 0, // 当前设置的时间间隔
  status: STOP, // 当前状态
};

function r(state = initState, action = {}) {
  const { payload = {}, type } = action;

  switch (type) {
    case TYPES.START:
      return {
        ...state,
        status: RUNNING,
        lastStartAt: moment().toISOString(),
        ...payload,
      };
    case TYPES.STOP:
      return {
        ...state,
        status: STOP,
        lastStopAt: moment().toISOString(),
      };
    case TYPES.TICK:
      return {
        ...state,
        lastAt: moment().toISOString(),
        count: state.count + 1,
      };
    case TYPES.CANCEL:
      return {
        ...initState,
      };
    default:
      return state;
  }
}

export default function reducer(state = {}, action) {
  if (!isCron(action)) return state;

  const { key } = action;

  const cron = Crons.get(key);

  if (!cron) return state;

  return setWith(
    { ...state },
    cron.reduxPath,
    r(get(state, cron.reduxPath), action),
    clone
  );
}
