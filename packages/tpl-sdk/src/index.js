import fetch from "@36node/fetch";
import { denormalize } from "@36node/query-normalizr";

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
    if (this.token) {
      return `Bearer ${this.token}`;
    }

    return "";
  }

  /**
   * Init store sdk
   *
   * @param {Object} opt
   * @param {string} opt.base  base url
   * @param {string} opt.token token for authorization
   */
  constructor(opt = {}) {
    this.base = opt.base || "";
    this.token = opt.token || "";
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
    listPets: (req = {}) => {
      const { query, headers } = req;

      return fetch(`${this.base}/pets`, {
        method: "get",
        query: denormalize(query),
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Create a pet
     *
     * @param {CreatePetRequest} req createPet request
     * @returns {Promise<CreatePetResponse>} The Pet created
     */
    createPet: (req = {}) => {
      const { headers, body } = req;

      if (!body) throw new Error("requetBody is required for createPet");

      return fetch(`${this.base}/pets`, {
        method: "post",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Find pet by id
     *
     * @param {ShowPetByIdRequest} req showPetById request
     * @returns {Promise<ShowPetByIdResponse>} Expected response to a valid request
     */
    showPetById: (req = {}) => {
      const { petId, headers } = req;

      if (!petId) throw new Error("petId is required for showPetById");

      return fetch(`${this.base}/pets/${petId}`, {
        method: "get",
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Update pet
     *
     * @param {UpdatePetRequest} req updatePet request
     * @returns {Promise<UpdatePetResponse>} The pet
     */
    updatePet: (req = {}) => {
      const { petId, headers, body } = req;

      if (!petId) throw new Error("petId is required for updatePet");
      if (!body) throw new Error("requetBody is required for updatePet");

      return fetch(`${this.base}/pets/${petId}`, {
        method: "put",
        body,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     *
     *
     * @param {DeletePetRequest} req deletePet request
     * @returns {Promise<DeletePetResponse>} pet deleted
     */
    deletePet: (req = {}) => {
      const { petId, headers } = req;

      if (!petId) throw new Error("petId is required for deletePet");

      return fetch(`${this.base}/pets/${petId}`, {
        method: "delete",
        headers: { Authorization: this.auth, ...headers },
      });
    },
  };
}
