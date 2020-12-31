//@ts-check
import fetch from "@36node/fetch";

export default class SDK {
  /**@type {string} **/
  base;
  /**@type {string} **/
  token;

  /**
   * Sdk auth
   *
   * @returns {string} auth header
   * */
  get auth() {
    return "";
  }

  /**
   * Init store sdk
   *
   * @param {Object} opt
   * @param {string} opt.base  base url
   * @param {string} opt.token token for authorization
   */
  constructor(opt = { base: "", token: "" }) {
    this.base = opt.base;
    this.token = opt.token;
  }

  /**
   * pet's methods
   */
  pet = {
    /**
     * List all pets
     *
     * @param {ListPetsRequest} req listPets request
     * @returns {Promise<ListPetsResponse>} A paged array of pets
     */
    listPets: req => {
      const { query } = req || {};

      return fetch(`${this.base}/pets`, {
        method: "GET",
        query,
        headers: { Authorization: this.auth },
      });
    },
    /**
     * Create a pet
     *
     * @param {CreatePetRequest} req createPet request
     * @returns {Promise<CreatePetResponse>} The Pet created
     */
    createPet: req => {
      const { body } = req || {};

      if (!body) throw new Error("requetBody is required for createPet");

      return fetch(`${this.base}/pets`, {
        method: "POST",
        body,
        headers: { Authorization: this.auth },
      });
    },
    /**
     * Find pet by id
     *
     * @param {ShowPetByIdRequest} req showPetById request
     * @returns {Promise<ShowPetByIdResponse>} Expected response to a valid request
     */
    showPetById: req => {
      const { petId } = req || {};

      if (!petId) throw new Error("petId is required for showPetById");

      return fetch(`${this.base}/pets/${petId}`, {
        method: "GET",
        headers: { Authorization: this.auth },
      });
    },
    /**
     * Update pet
     *
     * @param {UpdatePetRequest} req updatePet request
     * @returns {Promise<UpdatePetResponse>} The pet
     */
    updatePet: req => {
      const { petId, body } = req || {};

      if (!petId) throw new Error("petId is required for updatePet");
      if (!body) throw new Error("requetBody is required for updatePet");

      return fetch(`${this.base}/pets/${petId}`, {
        method: "PUT",
        body,
        headers: { Authorization: this.auth },
      });
    },
    /**
     *
     *
     * @param {DeletePetRequest} req deletePet request
     */
    deletePet: req => {
      const { petId } = req || {};

      if (!petId) throw new Error("petId is required for deletePet");

      return fetch(`${this.base}/pets/${petId}`, {
        method: "DELETE",
        headers: { Authorization: this.auth },
      });
    },
  };
}
