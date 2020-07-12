//@ts-check

import * as schemas from "./pet.schema.js";
import { validate } from "../middlewares";

/**
 * @typedef {Object} State
 */

export default class {
  /**
   * Bind service to router
   *
   * @param {import("koa-tree-router")} router the koa compatible router
   * @returns {this}
   */
  bind(router) {
    const listPets = async ctx => {
      const req = {
        query: ctx.query,
      };
      const res = await this.listPets(req, ctx);
      ctx.body = res.content;
      ctx.set("X-Total-Count", res.headers["X-Total-Count"]);
      ctx.status = 200;
    };

    const createPet = async ctx => {
      const req = {
        body: ctx.request.body,
      };
      const res = await this.createPet(req, ctx);
      ctx.body = res.content;
      ctx.status = 201;
    };

    const showPetById = async ctx => {
      const req = {
        petId: ctx.params.petId,
      };
      const res = await this.showPetById(req, ctx);
      ctx.body = res.content;
      ctx.status = 200;
    };

    const updatePet = async ctx => {
      const req = {
        petId: ctx.params.petId,
        body: ctx.request.body,
      };
      const res = await this.updatePet(req, ctx);
      ctx.body = res.content;
      ctx.status = 200;
    };

    const deletePet = async ctx => {
      const req = {
        petId: ctx.params.petId,
      };
      await this.deletePet(req, ctx);
      ctx.status = 204;
    };

    router.get(
      "/pets",
      validate(schemas.listPetsReqSchema, schemas.listPetsResSchema),
      ...this.middlewares("listPets"),
      listPets
    );
    router.post(
      "/pets",
      validate(schemas.createPetReqSchema, schemas.createPetResSchema),
      ...this.middlewares("createPet"),
      createPet
    );
    router.get(
      "/pets/:petId",
      validate(schemas.showPetByIdReqSchema, schemas.showPetByIdResSchema),
      ...this.middlewares("showPetById"),
      showPetById
    );
    router.put(
      "/pets/:petId",
      validate(schemas.updatePetReqSchema, schemas.updatePetResSchema),
      ...this.middlewares("updatePet"),
      updatePet
    );
    router.delete(
      "/pets/:petId",
      validate(schemas.deletePetReqSchema),
      ...this.middlewares("deletePet"),
      deletePet
    );

    return this;
  }

  /**
   * implement following abstract methods in the inherited class
   */

  /**
   * Ability to inject some middlewares
   *
   * @abstract
   * @param {string} operation name of operation
   * @returns {Array<import("koa").Middleware<State>>} middlewares
   */
  middlewares(operation) {
    return [];
  }

  /**
   * List all pets
   *
   * @abstract
   * @param {import("../api/pet").ListPetsRequest} req listPets request
   * @param {import("../api/pet").Context<State>} [ctx] koa context
   * @returns {Promise<import("../api/pet").ListPetsResponse>} A paged array of pets
   */
  listPets(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   * Create a pet
   *
   * @abstract
   * @param {import("../api/pet").CreatePetRequest} req createPet request
   * @param {import("../api/pet").Context<State>} [ctx] koa context
   * @returns {Promise<import("../api/pet").CreatePetResponse>} The Pet created
   */
  createPet(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   * Find pet by id
   *
   * @abstract
   * @param {import("../api/pet").ShowPetByIdRequest} req showPetById request
   * @param {import("../api/pet").Context<State>} [ctx] koa context
   * @returns {Promise<import("../api/pet").ShowPetByIdResponse>} Expected response to a valid request
   */
  showPetById(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   * Update pet
   *
   * @abstract
   * @param {import("../api/pet").UpdatePetRequest} req updatePet request
   * @param {import("../api/pet").Context<State>} [ctx] koa context
   * @returns {Promise<import("../api/pet").UpdatePetResponse>} The pet
   */
  updatePet(req, ctx) {
    throw new Error("not implemented");
  }

  /**
   *
   *
   * @abstract
   * @param {import("../api/pet").DeletePetRequest} req deletePet request
   * @param {import("../api/pet").Context<State>} [ctx] koa context
   */
  deletePet(req, ctx) {
    throw new Error("not implemented");
  }
}
