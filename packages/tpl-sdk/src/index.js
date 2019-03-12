/// <reference path='.index.d.ts' />

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
    if (this.token) {
      return `Bearer ${this.token}`;
    }
  }

  /**
   * Init store sdk
   *
   * @param {Object} opt
   * @param {string} opt.base  base url
   * @param {string} opt.token token fro authorization
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
        query,
        headers: { Authorization: this.auth, ...headers },
      });
    },
    /**
     * Create a pet
     *
     * @param {CreatePetsRequest} req createPets request
     * @returns {Promise<CreatePetsResponse>} The Pet created
     */
    createPets: (req = {}) => {
      const { headers, body } = req;

      if (!body) throw new Error("requetBody is required for createPets");

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
  };
}
