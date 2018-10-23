/**
 * pet
 */
export const CREATE_PET = "CREATE_PET";
export const GET_PET = "GET_PET";
export const LIST_PETS = "LIST_PETS";

/**
 * github
 */
export const LIST_REPOS = "LIST_REPOS";

/**
 * user
 */
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

// Add success and failure for string prototype
Object.assign(String.prototype, {
  success() {
    return `${this}_SUCCESS`;
  },
  failure() {
    return `${this}_FAILURE`;
  },
  glob() {
    return `${this}_*`;
  },
});
