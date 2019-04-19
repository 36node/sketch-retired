/// <reference path='../sdk/.github.d.ts' />

import * as cs from "../constants";

/**
 * Create action: LIST_REPOS
 * @param {ListReposRequest} payload the request of listRepos
 */
export const listRepos = payload => ({ type: cs.LIST_REPOS, payload });

/**
 * Create action: LIST_PETS
 * @param {import("@36node/template-sdk").ListPetsRequest} payload the request of listPets
 */
export const listPets = payload => ({ type: cs.LIST_PETS, payload });

/**
 * Create action: CREATE_PET
 * @param {import("@36node/template-sdk").CreatePetsRequest} payload the request of createPet
 */
export const createPet = payload => ({ type: cs.CREATE_PET, payload });

/**
 * Create action: GET_PET
 * @param {import("@36node/template-sdk").ShowPetByIdRequest} payload the request of getPet
 */
export const getPet = payload => ({ type: cs.GET_PET, payload });

/**
 * Login
 * @param {Object} payload login request
 */
export const login = payload => ({ type: cs.LOGIN, payload });

/**
 * Logout
 */
export const logout = () => ({ type: cs.LOGOUT });
