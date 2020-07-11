// @ts-check

import Debug from "debug";
import { toMongooseQuery } from "@36node/query-normalizr";

import API from "../api/pet";
import { Pet } from "../models";
import { plain } from "../lib";
import { loadPet, createDataRole, withRole } from "../middlewares";
import { Role } from "../constants";

const debug = Debug("store:service:pet");

/**
 * @typedef {Object} State
 * @property {import("../models/pet").PetDocument} pet - pet model
 */

export class Service extends API {
  _middlewares = {
    showPetById: [loadPet],
    updatePet: [loadPet, createDataRole, withRole(Role.PET_STORE_OWNER)],
    deletePet: [loadPet, createDataRole, withRole(Role.PET_STORE_OWNER)],
  };

  /**
   * Ability to inject some middlewares
   *
   * @override
   * @param {string} operation name of operation
   * @returns {Array<import("koa").Middleware<State>>} middlewares
   */
  middlewares(operation) {
    return this._middlewares[operation] || [];
  }

  /**
   * List all pets
   *
   * @override
   * @param {API.ListPetsRequest} req listPets request
   * @returns {Promise<API.ListPetsResponse>} A paged array of pets
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
   * @param {API.CreatePetRequest} req createPet request
   * @returns {Promise<API.CreatePetResponse>} The Pet created
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
   * @param {API.ShowPetByIdRequest} req showPetById request
   * @param {API.Context<State>} [ctx] koa context
   * @returns {Promise<API.ShowPetByIdResponse>} Expected response to a valid request
   */
  async showPetById(req, ctx) {
    const { pet } = ctx.state;
    return { content: plain(pet) };
  }

  /**
   * Update pet
   *
   * @override
   * @param {API.UpdatePetRequest} req updatePet request
   * @param {API.Context<State>} ctx koa context
   * @returns {Promise<API.UpdatePetResponse>} The pet
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
   * @param {API.DeletePetRequest} req deletePet request
   * @param {API.Context<State>} [ctx] koa context
   */
  async deletePet(req, ctx) {
    const { pet } = ctx.state;
    await pet.softDelete();
  }
}

const service = new Service();
export default service;
