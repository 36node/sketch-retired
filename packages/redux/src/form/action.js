import { isAction, makeAction } from "../lib";

const PREFIX = "@@form";

export const formTypes = {
  RESET: `${PREFIX}/RESET`,
  SAVE_FIELDS: `${PREFIX}/SAVE_FIELDS`,
};

export const isForm = isAction(new RegExp(`^${PREFIX}/.*$`));

export const makeForm = (key = "default", initPayload, initMeta) => {
  return {
    reset: makeAction(formTypes.RESET, key, initPayload, initMeta),
    saveFields: makeAction(formTypes.SAVE_FIELDS, key, initPayload, initMeta),
  };
};
