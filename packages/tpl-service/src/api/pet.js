import { authorize } from "./helper";
import { ListPetsParam, ShowPetByIdParam, NewPet, Pet } from "./schema"; // eslint-disable-line

export default class API {
  roles = {
    listPets: [],
    createPet: [],
    showPetById: [],
  };

  bind(router) {
    const listPets = async ctx => {
      const param = new ListPetsParam({
        limit: ctx.query.limit,
      });

      const result = await this.listPets(ctx, param);
      const xNext = await this.listPetsXNext(ctx, param);

      ctx.body = result;
      ctx.set("X-Next", xNext);
    };

    const createPet = async ctx => {
      const newPet = new NewPet(ctx.request.body);

      const result = await this.createPet(ctx, newPet);

      ctx.body = result;
    };

    const showPetById = async ctx => {
      const param = new ShowPetByIdParam({
        petId: ctx.params.petId,
      });

      const result = await this.showPetById(ctx, param);

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
   * @param {Object} ctx koa context
   * @param {ListPetsParam} param listPets parameters
   * @returns {Array<Pet>} A paged array of pets
   */

  listPets(ctx, param) {
    throw new Error("not implemented");
  }

  /**
   * List all pets' x-next
   *
   * @abstract
   * @param {Object} ctx koa context
   * @param {ListPetsParam} param listPets parameters
   * @returns {string} A link to the next page of responses
   */

  listPetsXNext(ctx, param) {
    throw new Error("not implemented");
  }

  /**
   * Create a pet
   *
   * @abstract
   * @param {Object} ctx koa context
   * @param {NewPet} body createPet's body
   * @returns {Pet} The Pet created
   */

  createPet(ctx, body) {
    throw new Error("not implemented");
  }

  /**
   * Find pet by id
   *
   * @abstract
   * @param {Object} ctx koa context
   * @param {ShowPetByIdParam} param showPetById's parameters
   * @returns {Pet} Expected response to a valid request
   */

  showPetById(ctx, param) {
    throw new Error("not implemented");
  }
}
