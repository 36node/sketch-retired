import { NS } from "../constants";

import { createApiActions } from "@36node/redux-api";
import { petSchema } from "../schemas";
import { petstore } from "../sdk";
import { createCronActions } from "@36node/redux-cron";
import { put, select } from "redux-saga/effects";
import { petStoreSelectors } from "../selectors";

const listPets = createApiActions(NS.PET_STORE.LIST_PETS, {
  endpoint: petstore.pet.listPets,
  schema: [petSchema],
});
/**
 * pet store actions
 */
export const petStoreActions = {
  listPets,
  createPet: createApiActions(NS.PET_STORE.CREATE_PET, {
    endpoint: petstore.pet.createPet,
    schema: petSchema,
  }),
  getPet: createApiActions(NS.PET_STORE.GET_PET, {
    endpoint: petstore.pet.showPetById,
    schema: petSchema,
  }),
  pageCron: createCronActions(NS.PET_STORE.PAGE_CRON, {
    onTick: function*(count = 0, actions) {
      const { request = {}, total = 0 } = yield select(
        petStoreSelectors.listPets
      );

      const { query = {} } = request;
      const nextOffset = query.offset + query.limit;
      if (nextOffset >= total) {
        // stop auto page
        yield put(actions.stop());
      } else {
        yield put(
          listPets.request({
            query: {
              ...query,
              offset: nextOffset,
            },
          })
        );
      }
    },
  }),
};
