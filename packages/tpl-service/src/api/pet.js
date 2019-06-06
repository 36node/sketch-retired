/// <reference path='./def.d.ts' />
import createError from "http-errors";

export default class API {
  /**
   * Bind service to router
   *
   * @param {Object} router the koa compatible router
   */
  bind(router) {
    const listPets = async ctx => {
      const req = {
        query: ctx.normalizedQuery || {},
      };

      const res = await this.listPets(req, ctx);

      if (!res.body) throw createError(500, "should have body in response");

      if (!res.headers || res.headers.xTotalCount === undefined)
        throw createError(500, "should have header X-Total-Count in response");

      ctx.body = res.body;
      ctx.set("X-Total-Count", res.headers.xTotalCount);
      ctx.status = 200;
    };

    const createPets = async ctx => {
      const req = {
        body: ctx.request.body,
      };

      const res = await this.createPets(req, ctx);

      if (!res.body) throw createError(500, "should have body in response");

      ctx.body = res.body;
      ctx.status = 201;
    };

    const showPetById = async ctx => {
      if (!ctx.params.petId)
        throw createError(400, "petId in path is required.");

      const req = {
        petId: ctx.params.petId,
      };

      const res = await this.showPetById(req, ctx);

      if (!res.body) throw createError(500, "should have body in response");

      ctx.body = res.body;
      ctx.status = 200;
    };

    const updatePet = async ctx => {
      if (!ctx.params.petId)
        throw createError(400, "petId in path is required.");

      const req = {
        petId: ctx.params.petId,
        body: ctx.request.body,
      };

      const res = await this.updatePet(req, ctx);

      if (!res.body) throw createError(500, "should have body in response");

      ctx.body = res.body;
      ctx.status = 200;
    };

    const deletePet = async ctx => {
      if (!ctx.params.petId)
        throw createError(400, "petId in path is required.");

      const req = {
        petId: ctx.params.petId,
      };

      await this.deletePet(req, ctx);

      ctx.status = 204;
    };

    router.get("/pets", ...this.middlewares("listPets"), listPets);
    router.post("/pets", ...this.middlewares("createPets"), createPets);
    router.get("/pets/:petId", ...this.middlewares("showPetById"), showPetById);
    router.put("/pets/:petId", ...this.middlewares("updatePet"), updatePet);
    router.delete("/pets/:petId", ...this.middlewares("deletePet"), deletePet);
  }

  /**
   * implement following abstract methods in the inherited class
   */

  /**
   * Ability to inject some middlewares
   *
   * @param {string} operation name of operation
   * @returns {function[]} middlewares
   */
  middlewares(operation) {
    return [];
  }

  /**
   * List all pets
   *
   * @abstract
   * @param {ListPetsRequest} req listPets request
   * @param {import("koa").Context} ctx koa context
   * @returns {ListPetsResponse} A paged array of pets
   */
  listPets(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   * Create a pet
   *
   * @abstract
   * @param {CreatePetsRequest} req createPets request
   * @param {import("koa").Context} ctx koa context
   * @returns {CreatePetsResponse} The Pet created
   */
  createPets(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   * Find pet by id
   *
   * @abstract
   * @param {ShowPetByIdRequest} req showPetById request
   * @param {import("koa").Context} ctx koa context
   * @returns {ShowPetByIdResponse} Expected response to a valid request
   */
  showPetById(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   * Update pet
   *
   * @abstract
   * @param {UpdatePetRequest} req updatePet request
   * @param {import("koa").Context} ctx koa context
   * @returns {UpdatePetResponse} The pet
   */
  updatePet(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   *
   *
   * @abstract
   * @param {DeletePetRequest} req deletePet request
   * @param {import("koa").Context} ctx koa context
   */
  deletePet(req, ctx) {
    throw new Error("not implemented");
  }
}
