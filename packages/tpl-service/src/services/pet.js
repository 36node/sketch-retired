import API, { ListPetsResult, CreatePetsResult, ShowPetByIdResult } from "../api/pet";
import * as schemas from "../api/lib/schemas"; // eslint-disable-line
import Pet from "../models/pet";

export class Service extends API {
  roles = {
    listPets: [],
    createPet: [],
    showPetById: [],
  };

  /**
   * List all pets
   *
   * @param { Object } state ctx.state store state data, like state.user
   * @param { import("../api/pet").ListPetsOptions } options listPets options
   * @returns { ListPetsResult } A paged array of pets
   */

  async listPets(state, options) {
    const { limit = 100 } = options;
    const conditions = {};

    const pets = await Pet.list({ limit, conditions });
    const res = new ListPetsResult();
    res.body = pets.map(p => new schemas.Pet(p));
    res.xNext = "nextLink";
    return res;
  }

  /**
   * Create a pet
   *
   * @param { Object } state ctx.state store state data, like state.user
   * @param { import("../api/pet").CreatePetsOptions } options createPets options
   * @returns { CreatePetsResult } The Pet created
   */

  async createPets(state, options) {
    const { body } = options;
    const pet = await Pet.create(body);
    console.log(pet);
    const res = new CreatePetsResult();
    res.body = new schemas.Pet(pet);
    return res;
  }

  /**
   * Find pet by id
   *
   * @param { Object } state ctx.state store state data, like state.user
   * @param { import("../api/pet").ShowPetByIdOptions } options showPetById options
   * @returns { ShowPetByIdResult } Expected response to a valid request
   */

  async showPetById(state, options) {
    const { petId } = options;
    const pet = await Pet.get(petId);
    const res = new ShowPetByIdResult();
    res.body = new schemas.Pet(pet);
    return res;
  }
}

const service = new Service();
export default service;
