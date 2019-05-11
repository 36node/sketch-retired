import API from "../api/pet";
import Pet from "../models/pet";

export class Service extends API {
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
    const { petId } = req;
    console.log(petId);
    const pet = await Pet.get(petId);
    return { body: pet };
  }
}

const service = new Service();
export default service;
