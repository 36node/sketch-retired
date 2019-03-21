import { denormalize } from "normalizr";
import { repoSchema, petSchema } from "./schemas";

export const selectSession = state => state.session.result;
export const selectRedirect = state => state.session.meta.redirect;
export const selectRepos = state =>
  denormalize(state.paginators.repo.result, [repoSchema], state.entities);
export const selectPets = state =>
  denormalize(state.paginators.pet.result, [petSchema], state.entities);
