import { createApiAction } from "@36node/redux-api";
import { createCronActions } from "@36node/redux-cron";
import { put, select } from "redux-saga/effects";

import { actionTypes, storeKeys } from "../constants";
import { petSchema } from "../schemas";
import { petstore } from "../sdk";
import { petStoreSelectors } from "../selectors";

/*
 * pet store actions
 */
export const listPets = createApiAction(
  actionTypes.PET_STORE.LIST_PETS,
  petstore.pet.listPets,
  {
    key: storeKeys.petStore.pets,
    schema: [petSchema],
  }
);

export const createPet = createApiAction(
  actionTypes.PET_STORE.CREATE_PET,
  petstore.pet.createPet,
  {
    schema: petSchema,
  }
);

export const getPet = createApiAction(
  actionTypes.PET_STORE.GET_PET,
  petstore.pet.showPetById,
  {
    schema: petSchema,
  }
);

export const pageCron = createCronActions(actionTypes.PET_STORE.PAGE_CRON, {
  onTick: function*(count = 0, actions) {
    const { request = {}, total = 0 } = yield select(
      petStoreSelectors.selectPets
    );

    const { query = {} } = request;
    const nextOffset = query.offset + query.limit;
    if (nextOffset >= total) {
      // stop auto page
      yield put(actions.stop());
    } else {
      yield put(
        listPets({
          query: {
            ...query,
            offset: nextOffset,
          },
        })
      );
    }
  },
});
