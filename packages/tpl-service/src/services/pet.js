// @ts-check

import Debug from "debug";
import { toMongooseQuery } from "@36node/query-normalizr";

import API from "../api/pet";
import { Pet } from "../models";
import { plain } from "../lib";
import { loadPet, createDataRole, withRole } from "../middlewares";
import { Role } from "../constants";

const debug = Debug("store:service:pet");

export class Service extends API {
  _middlewares = {
    showPetById: [loadPet],
    updatePet: [loadPet, createDataRole, withRole(Role.OWNER)],
    deletePet: [loadPet, createDataRole, withRole(Role.OWNER)],
  };

  /**
   * Ability to inject some middlewares
   *
   * @override
   * @param {string} operation name of operation
   * @returns {Array<import("koa").Middleware>} middlewares
   */
  middlewares(operation) {
    return this._middlewares[operation] || [];
  }

  /**
   * List all pets
   *
   * @override
   * @param {import("../api/pet").ListPetsRequest} req listPets request
   * @returns {Promise<import("../api/pet").ListPetsResponse>} A paged array of pets
   */
  async listPets(req) {
    const query = toMongooseQuery(req.query);
    const docs = await Pet.list(query);
    const count = await Pet.count(query.filter);

    return {
      content: plain(docs),
      headers: {
        "X-Total-Count": count,
      },
    };
  }

  /**
   * Create a pet
   *
   * @override
   * @param {import("../api/pet").CreatePetRequest} req createPet request
   * @returns {Promise<import("../api/pet").CreatePetResponse>} The Pet created
   */
  async createPet(req) {
    debug("crete pet with body %o", req.body);
    const pet = await Pet.create(req.body);
    return { content: plain(pet) };
  }

  /**
   * Find pet by id
   *
   * @override
   * @param {import("../api/pet").ShowPetByIdRequest} req showPetById request
   * @param {import("koa").Context} [ctx] koa context
   * @returns {Promise<import("../api/pet").ShowPetByIdResponse>} Expected response to a valid request
   */
  async showPetById(req, ctx) {
    const { pet } = ctx.state;
    return { content: plain(pet) };
  }

  /**
   * Update pet
   *
   * @override
   * @param {import("../api/pet").UpdatePetRequest} req updatePet request
   * @param {import("koa").Context} [ctx] koa context
   * @returns {Promise<import("../api/pet").UpdatePetResponse>} The pet
   */
  async updatePet(req, ctx) {
    const { pet } = ctx.state;
    debug("update pet with body %o", req.body);
    await pet.set(req.body).save();
    return { content: plain(pet) };
  }

  /**
   * Delete pet
   *
   * @override
   * @param {import("../api/pet").DeletePetRequest} req deletePet request
   * @param {import("koa").Context} [ctx] koa context
   */
  async deletePet(req, ctx) {
    const { pet } = ctx.state;
    await pet.softDelete();
  }
}

const service = new Service();
export default service;
