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
        query: {
          _limit: ctx.query._limit,
          tag: ctx.query.tag,
          age_gt: ctx.query.age_gt,
        },
        context: ctx, // here we put koa context in request
      };

      const res = await this.listPets(req);

      if (!res.body) throw createError(500, "should have body in response");

      if (!res.headers.xNext)
        throw createError(500, "should have header x-next in response");

      ctx.body = res.body;
      ctx.set("x-next", res.headers.xNext);
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
      ctx.status = 200;
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

    router.get("/pets", this.authorize("listPets"), listPets);
    router.post("/pets", this.authorize("createPets"), createPets);
    router.get("/pets/:petId", this.authorize("showPetById"), showPetById);
  }

  /**
   * implement following abstract methods in the inherited class
   */

  /**
   * Authorize current operation
   * rewrite it if you want to control operation permission
   *
   * @param {string} operation name of operation
   */
  authorize(operation) {
    return (ctx, next) => {
      return next();
    };
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
}
