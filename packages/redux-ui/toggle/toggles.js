/**
 * @constant
 * @type {Map<String, import(".").Toggle}
 */
export const Toggles = new Map();

export function registerToggle(toggle) {
  Toggles.set(toggle.key, toggle);
}
