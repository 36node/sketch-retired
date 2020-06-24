// @ts-check

import { pick } from "lodash";
import Debug from "debug";
import createError from "http-errors";
import { toMongooseQuery } from "@36node/query-normalizr";

import API from "../api/pet";
import { PetModel } from "../models";

const debug = Debug("store:service:pet");

/**
 * 根据 petId 加载 pet
 *
 * @param {string} petId pet's id
 * @returns {Promise<import("../models/pet").PetDocument>}
 */
const loadPet = async petId => {
  const pet = await PetModel.get(petId);
  if (!pet) {
    throw createError(404, `pet ${petId} not found`, {
      path: "petId",
      value: petId,
    });
  }
  return pet;
};

export class Service extends API {
  _middlewares = {
    showPetById: [],
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
   * @param {import("koa").Context} [ctx] koa context
   * @returns {Promise<import("../api/pet").ListPetsResponse>} A paged array of pets
   */
  async listPets(req, ctx) {
    const query = toMongooseQuery(ctx.query);
    const docs = await PetModel.list(query);
    const count = await PetModel.count(query.filter);

    return {
      content: docs.map(o => o.toJSON()),
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
   * @param {import("koa").Context} [ctx] koa context
   * @returns {Promise<import("../api/pet").CreatePetResponse>} The Pet created
   */
  async createPet(req, ctx) {
    const { body } = req;
    debug("crete pet with body %o", body);
    const pet = await PetModel.create(body);
    debug("creted pet %o", pet);
    return { content: pet.toJSON() };
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
    const pet = await loadPet(req.petId);
    return { content: pet.toJSON() };
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
    const pet = await loadPet(req.petId);
    const doc = pick(req.body, ["name", "tag", "age"]);
    await pet.set(doc).save();
    return { content: pet.toJSON() };
  }

  /**
   * Delete pet
   *
   * @override
   * @param {import("../api/pet").DeletePetRequest} req deletePet request
   * @param {import("koa").Context} [ctx] koa context
   */
  async deletePet(req, ctx) {
    const pet = await loadPet(req.petId);
    await pet.softDelete();
  }
}

const service = new Service();
export default service;
