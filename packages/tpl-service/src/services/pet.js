import API from "../api/pet";
import { ListPetsParam, ShowPetByIdParam, NewPet, Pet } from "../api/schema"; // eslint-disable-line
import PetModel from "../models/pet";

export class Service extends API {
  roles = {
    listPets: [],
    createPet: [],
    showPetById: [],
  };

  /**
   * List all pets
   *
   * @abstract
   * @param {Object} ctx koa context
   * @param {ListPetsParam} param listPets parameters
   * @returns {Array<Pet>} A paged array of pets
   */

  listPets(ctx, param) {
    return PetModel.find();
  }

  /**
   * List all pets' x-next
   *
   * @abstract
   * @param {Object} ctx koa context
   * @param {ListPetsParam} param listPets parameters
   * @returns {string} A link to the next page of responses
   */

  listPetsXNext(ctx, param) {
    return "x-next";
  }

  /**
   * Create a pet
   *
   * @abstract
   * @param {Object} ctx koa context
   * @param {NewPet} body createPet's body
   * @returns {Pet} The Pet created
   */

  createPet(ctx, body) {
    return PetModel.create(body);
  }

  /**
   * Find pet by id
   *
   * @abstract
   * @param {Object} ctx koa context
   * @param {ShowPetByIdParam} param showPetById's parameters
   * @returns {Pet} Expected response to a valid request
   */

  async showPetById(ctx, param) {
    const pet = await PetModel.get(param.petId);
    return pet;
  }
}

const service = new Service();
export default service;
