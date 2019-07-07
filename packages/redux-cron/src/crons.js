/**
 * @constant
 * @type {Map<String, import("./index").Cron}
 */
export const Crons = new Map();

export function registerCron(cron) {
  Crons.set(cron.key, cron);
}
