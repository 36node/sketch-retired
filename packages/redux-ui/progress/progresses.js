/**
 * @constant
 * @type {Map<String, import(".").Progress}
 */
export const Progresses = new Map();

/**
 * register progress
 * @param {import(".").Progress} progress
 */
export function registerProgress(progress) {
  Progresses.set(progress.key, progress);
}
