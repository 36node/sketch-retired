import { authorize, makesure } from "./lib/utils";
import * as schemas from "./lib/schemas";

export class ListPetsOptions {
  /** @type { integer } */
  limit;

  constructor(obj) {
    this.limit = makesure("limit", obj.limit, "integer", false);
  }
}
export class CreatePetsOptions {
  /** @type { schemas.NewPet } */
  body;

  constructor(obj) {
    this.body = makesure("body", obj.body, schemas.NewPet, true);
  }
}
export class ShowPetByIdOptions {
  /** @type { string } */
  petId;

  constructor(obj) {
    this.petId = makesure("petId", obj.petId, "string", true);
  }
}

export class ListPetsResult {
  /** @type { schemas.Pets } */
  body;
  /** @type { string } */
  xNext;
}
export class CreatePetsResult {
  /** @type { schemas.Pet } */
  body;
}
export class ShowPetByIdResult {
  /** @type { schemas.Pets } */
  body;
}

export default class API {
  roles = {
    listPets: [],
    createPets: [],
    showPetById: [],
  };

  bind(router) {
    const listPets = async ctx => {
      const options = new ListPetsOptions({
        limit: ctx.query.limit,
      });

      try {
        const result = await this.listPets(ctx.state, options);

        // check result
        if (result.body instanceof schemas.Pets) {
          throw new Error("result.body should be instanceof schemas.Pets");
        }
        if (!result.xNext) throw new Error("result should have xNext");

        ctx.status = 200;
        ctx.body = result.body;
        ctx.set("x-next", result.xNext);
      } catch (err) {
        ctx.status = err.status;
        ctx.body = err;
      }
    };

    const createPets = async ctx => {
      const options = new CreatePetsOptions({
        body: ctx.request.body,
      });

      try {
        const result = await this.createPets(ctx.state, options);

        // check result
        if (result.body instanceof schemas.Pet) {
          throw new Error("result.body should be instanceof schemas.Pet");
        }

        ctx.status = 200;
        ctx.body = result.body;
      } catch (err) {
        ctx.status = err.status;
        ctx.body = err;
      }
    };

    const showPetById = async ctx => {
      const options = new ShowPetByIdOptions({
        petId: ctx.path.petId,
      });

      try {
        const result = await this.showPetById(ctx.state, options);

        // check result
        if (result.body instanceof schemas.Pets) {
          throw new Error("result.body should be instanceof schemas.Pets");
        }

        ctx.status = 200;
        ctx.body = result.body;
      } catch (err) {
        ctx.status = err.status;
        ctx.body = err;
      }
    };

    router.get("/pets", authorize(this.roles.listPets), listPets);
    router.post("/pets", authorize(this.roles.createPets), createPets);
    router.get("/pets/{petId}", authorize(this.roles.showPetById), showPetById);
  }

  /**
   * implement following abstract methods in the inherited class
   */

  /**
   * List all pets
   *
   * @abstract
   * @param { Object } state ctx.state store state data, like state.user
   * @param { ListPetsOptions } options listPets options
   * @returns { ListPetsResult } A paged array of pets
   */

  listPets(state, options) {
    throw new Error("not implemented");
  }
  /**
   * Create a pet
   *
   * @abstract
   * @param { Object } state ctx.state store state data, like state.user
   * @param { CreatePetsOptions } options createPets options
   * @returns { CreatePetsResult } The Pet created
   */

  createPets(state, options) {
    throw new Error("not implemented");
  }
  /**
   * Find pet by id
   *
   * @abstract
   * @param { Object } state ctx.state store state data, like state.user
   * @param { ShowPetByIdOptions } options showPetById options
   * @returns { ShowPetByIdResult } Expected response to a valid request
   */

  showPetById(state, options) {
    throw new Error("not implemented");
  }
}
