import { pick } from "lodash";

import API from "../api/pet";
import Pet from "../models/pet";

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
        ctx.state.pet = await Pet.get(petId);
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
   * @returns {ListPetsResponse} A paged array of pets
   */
  async listPets(req) {
    const limit = req.query.limit || 10; // default is 10
    const offset = req.query.offset || 0; // default is 0
    const sort = req.query.sort;
    const filter = req.query.filter;
    const result = await Pet.list({ limit, offset, sort, filter });

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
   * @returns {CreatePetsResponse} The Pet created
   */
  async createPets(req) {
    const { body } = req;
    const pet = await Pet.create(body);
    return { body: pet };
  }

  /**
   * Find pet by id
   *
   * @param {ShowPetByIdRequest} req showPetById request
   * @returns {ShowPetByIdResponse} Expected response to a valid request
   */
  async showPetById(req) {
    const ctx = req.context;
    return { body: ctx.state.pet };
  }

  /**
   * Update pet
   *
   * @param {UpdatePetRequest} req updatePet request
   * @returns {UpdatePetResponse} The pet
   */
  async updatePet(req) {
    const ctx = req.context;
    const pet = ctx.state.pet;
    const doc = pick(req.body, ["name", "tag", "age"]);
    await pet.set(doc).save();
    return { body: pet };
  }

  /**
   * Delete pet by id
   *
   * @param {DeletePetRequest} req deletePet request
   */
  async deletePet(req) {
    const ctx = req.context;
    await ctx.state.pet.delete();
  }
}

const service = new Service();
export default service;
