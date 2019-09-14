import { createApiMaker } from "@36node/redux";

import * as types from "./types";
import * as sdk from "../sdk";
import { petSchema, repoSchema } from "../schemas";

export const store = {
  makeListPets: createApiMaker(
    types.STORE_LIST_PETS,
    sdk.petstore.pet.listPets,
    [petSchema]
  ),
  makeGetPet: createApiMaker(
    types.STORE_GET_PET,
    sdk.petstore.pet.showPetById,
    petSchema
  ),
  makeCreatePet: createApiMaker(
    types.STORE_CREATE_PET,
    sdk.petstore.pet.createPet,
    petSchema
  ),
  makeUpdatePet: createApiMaker(
    types.STORE_UPDATE_PET,
    sdk.petstore.pet.updatePet,
    petSchema
  ),
  makeDeletePet: createApiMaker(
    types.STORE_DELETE_PET,
    sdk.petstore.pet.deletePet,
    petSchema
  ),
};

export const github = {
  makeListRepos: createApiMaker(
    types.GITHUB_LIST_REPOS,
    sdk.github.repo.listRepos,
    [repoSchema]
  ),
};

export const auth = {
  makeLogin: createApiMaker(types.LOGIN, sdk.auth.session.createSession),
  makeLogout: createApiMaker(types.LOGOUT, sdk.auth.session.deleteSession),
  makeRefresh: createApiMaker(types.REFRESH, sdk.auth.session.getSession),
  makeUnAuth: createApiMaker(types.UN_AUTH, sdk.auth.session.unauth),
};
