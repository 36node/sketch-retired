import fetch from "../lib/fetch";

export default class SDK {
  /**
   * Init pet sdk client
   *
   * @param {Object} opt
   * @param {string} opt.baseUrl
   */
  constructor(opt) {
    this.baseUrl = opt.baseUrl;
  }

  /**
   * List all pets
   *
   * @param {ListPetsRequest} req ListPets request
   * @returns {Promise<ListPetsResponse>} A paged array of pets
   */
  listPets(req) {
    const { query } = req;

    return fetch(`${this.baseUrl}/pets`, {
      query,
    });
  }

  /**
   * Create a pet
   *
   * @param {CreatePetsRequest} req CreatePets request
   * @returns {Promise<CreatePetsResponse>} The Pet created
   */
  createPets(req) {
    const { body } = req;
    if (!body) throw new Error("requestBody is required for CreatePets");

    return fetch(`${this.baseUrl}/pets`, {
      body,
    });
  }

  /**
   * Find pet by id
   *
   * @param {ShowPetByIdRequest} req ShowPetById request
   * @returns {Promise<ShowPetByIdResponse>} Expected response to a valid request
   */

  showPetById(req) {
    const { petId } = req;
    if (!petId) throw new Error("petId is required for ShowPetById");

    return fetch(`${this.baseUrl}/pets/${petId}`);
  }
}
