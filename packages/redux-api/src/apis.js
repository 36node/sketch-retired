export const Apis = new Map();

export function registerSaga(key, api) {
  Apis.set(key, api);
}
