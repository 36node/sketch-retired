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
    const limit = Number(req.query._limit) || 100;
    const tag = req.query.tag;
    const age_gt = req.query.age_gt;

    const result = await Pet.list({ limit, filter: { tag, age_gt } });
    return {
      body: result.docs,
      headers: {
        xNext: "nextLink",
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
