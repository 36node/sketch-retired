export const SESSION_ID = "session_id";
export const TOKEN = "token";
export const LOGIN_URL = "/login";

export const actionTypes = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  RELOGIN: "RELOGIN",
  UNAUTH: "UNAUTH",
  PET_STORE: {
    LIST_PETS: "PET_STORE.LIST_PETS",
    CREATE_PET: "PET_STORE.CREATE_PET",
    GET_PET: "PET_STORE.GET_PET",
    PAGE_CRON: "PET_STORE.PAGE_CRON",
  },
  GITHUB: {
    LIST_REPOS: "GITHUB.LIST_REPOS",
  },
  REDUX_UI: {
    TOGGLE_EXP: "REDUX_UI.TOGGLE_EXP",
    ASSIGN_EXP: "REDUX_UI.ASSIGN_EXP",
    PROGRESS_EXP: "REDUX_UI.PROGRESS_EXP",
  },
  REDUX_FORM: {
    FORM_EXP: "REDUX_FORM.FORM_EXP",
  },
  REDUX_XLSX: {
    PETS_XLSX: "REDUX_XLSX.PETS_XLSX",
  },
};

export const storeKeys = {
  session: "session",
  github: {
    repos: "github.repos",
  },
  petStore: {
    pets: "petStore.pets",
  },
};
