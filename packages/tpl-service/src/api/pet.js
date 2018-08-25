import { authorize, makesure, NewPet, Pet } from "./helper";

export default class API {
  roles = {
    listPets: [],
    createPet: [],
    showPetById: [],
  };

  bind(router) {
    const listPets = async ctx => {
      const options = {
        session: ctx.session,
        limit: makesure("limit", ctx.query.limit, "int32"),
      };

      const result = await this.listPets(options);
      const xNext = await this.listPetsXNext(options);

      ctx.body = result;
      ctx.set("X-Next", xNext);
    };

    const createPet = async ctx => {
      const newPet = new NewPet(ctx.request.body);
      const options = { session: ctx.session };

      const result = await this.createPet(newPet, options);

      ctx.body = result;
    };

    const showPetById = async ctx => {
      const options = { session: ctx.session };
      const petId = makesure("petId", ctx.params.petId, "string", true);

      const result = await this.showPetById(petId, options);

      if (!result) return ctx.throw(404, "not found");
      ctx.body = result;
    };

    router.get("/pets", authorize(this.roles.listPets), listPets);
    router.post("/pets", authorize(this.roles.createPet), createPet);
    router.get("/pets/:petId", authorize(this.roles.showPetById), showPetById);
  }

  /**
   * implement following abstract methods in inherited class
   */

  /**
   * List all pets
   *
   * @abstract
   * @param {object} options optional params
   * - {object} session session object
   * - {number} limit the number of returned pets
   * @returns {Array<Pet>} A paged array of pets
   */
  listPets(options) {
    throw new Error("not implemented");
  }

  /**
   * List all pets' x-next
   *
   * @abstract
   * @param {object} options optional params
   * @returns {string} A link to the next page of responses
   */
  listPetsXNext(options) {
    throw new Error("not implemented");
  }

  /**
   * Create a pet
   *
   * @abstract
   * @param {object} options optional params
   * @returns {Pet} The Pet created
   */
  createPet(newPet, options) {
    throw new Error("not implemented");
  }

  /**
   * Find pet by id
   *
   * @abstract
   * @param {string} petId The id of the pet to retrieve
   * @param {object} options optional params
   * @returns {Pet} Expected response to a valid request
   */
  showPetById(petId, options) {
    throw new Error("not implemented");
  }
}
