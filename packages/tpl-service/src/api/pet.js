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
        context: ctx, // here we put koa context in request
      };

      const res = await this.listPets(req);

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
        context: ctx, // here we put koa context in request
      };

      const res = await this.createPets(req);

      if (!res.body) throw createError(500, "should have body in response");

      ctx.body = res.body;
      ctx.status = 201;
    };

    const showPetById = async ctx => {
      if (!ctx.params.petId)
        throw createError(400, "petId in path is required.");

      const req = {
        petId: ctx.params.petId,
        context: ctx, // here we put koa context in request
      };

      const res = await this.showPetById(req);

      if (!res.body) throw createError(500, "should have body in response");

      ctx.body = res.body;
      ctx.status = 200;
    };

    const deletePet = async ctx => {
      if (!ctx.params.id) throw createError(400, "id in path is required.");

      const req = {
        id: ctx.params.id,
        context: ctx, // here we put koa context in request
      };

      await this.deletePet(req);

      ctx.status = 204;
    };

    router.get("/pets", ...this.middlewares("listPets"), listPets);
    router.post("/pets", ...this.middlewares("createPets"), createPets);
    router.get("/pets/:petId", ...this.middlewares("showPetById"), showPetById);
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
   * @returns {ListPetsResponse} A paged array of pets
   */
  listPets(req) {
    throw new Error("not implemented");
  }

  /**
   * Create a pet
   *
   * @abstract
   * @param {CreatePetsRequest} req createPets request
   * @returns {CreatePetsResponse} The Pet created
   */
  createPets(req) {
    throw new Error("not implemented");
  }

  /**
   * Find pet by id
   *
   * @abstract
   * @param {ShowPetByIdRequest} req showPetById request
   * @returns {ShowPetByIdResponse} Expected response to a valid request
   */
  showPetById(req) {
    throw new Error("not implemented");
  }

  /**
   *
   *
   * @abstract
   * @param {DeletePetRequest} req deletePet request
   */
  deletePet(req) {
    throw new Error("not implemented");
  }
}
