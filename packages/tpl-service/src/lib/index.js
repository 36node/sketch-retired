import logger from "./log";

export { logger };

export function plain(obj) {
  return JSON.parse(JSON.stringify(obj));
}
