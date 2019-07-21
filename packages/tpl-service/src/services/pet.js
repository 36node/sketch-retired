import { pick } from "lodash";

import API from "../api/pet";
import { PetModel } from "../models";

export class Service extends API {
  /**
   * Ability to inject some middlewares
   *
   * @param {string} operation name of operation
   * @returns {function[]} middlewares
   */
  middlewares(operation) {
    const load = async (ctx, next) => {
      let { petId } = ctx.params;
      if (petId) {
        ctx.state.pet = await PetModel.get(petId);
        if (!ctx.state.pet) {
          throw ctx.throw(404, `pet ${petId} not found.`);
        }
      }
      await next();
    };
    return [load];
  }

  /**
   * List all pets
   *
   * @param {ListPetsRequest} req listPets request
   * @param {import("koa").Context} ctx koa context
   * @returns {ListPetsResponse} A paged array of pets
   */
  async listPets(req, ctx) {
    const { limit = 10, offset = 0, sort, filter } = req.query;
    const result = await PetModel.list({ limit, offset, sort, filter });

    return {
      body: result.docs,
      headers: {
        xTotalCount: result.total,
      },
    };
  }

  /**
   * Create a pet
   *
   * @param {CreatePetsRequest} req createPets request
   * @param {import("koa").Context} ctx koa context
   * @returns {CreatePetsResponse} The Pet created
   */
  async createPet(req, ctx) {
    const { body } = req;
    const pet = await PetModel.create(body);
    return { body: pet };
  }

  /**
   * Find pet by id
   *
   * @param {ShowPetByIdRequest} req showPetById request
   * @param {import("koa").Context} ctx koa context
   * @returns {ShowPetByIdResponse} Expected response to a valid request
   */
  async showPetById(req, ctx) {
    return { body: ctx.state.pet };
  }

  /**t
   * Update pet
   *
   * @param {UpdatePetRequest} req updatePet request
   * @param {import("koa").Context} ctx koa context
   * @returns {UpdatePetResponse} The pet
   */
  async updatePet(req, ctx) {
    const pet = ctx.state.pet;
    const doc = pick(req.body, ["name", "tag", "age"]);
    await pet.set(doc).save();
    return { body: pet };
  }

  /**
   * Delete pet by id
   *
   * @param {DeletePetRequest} req deletePet request
   * @param {import("koa").Context} ctx koa context
   */
  async deletePet(req, ctx) {
    await ctx.state.pet.delete();
  }
}

const service = new Service();
export default service;
