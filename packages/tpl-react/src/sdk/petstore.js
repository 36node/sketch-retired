/// <reference path='.petstore.d.ts' />

import fetch from "@36node/fetch";

export default class SDK {
  /**
   * Base url
   * @type {string}
   *  */
  base;

  /**
   * Sdk auth
   * @type {string}
   * */
  auth;

  /**
   * Init store sdk
   *
   * @param {Object} opt
   * @param {string} opt.base  base url
   * @param {string} opt.token token fro authorization
   */
  constructor(opt = {}) {
    this.base = opt.base || ""; // default use swagger.info.server
    // 如果 openapi.yml 中有 securitySchemes.bearerAuth
    if (opt.token) {
      this.auth = `Bearer ${opt.token}`;
    }
  }

  /**
   * pet's methods
   */

  pet = {
    /**
     * List all pets
     *
     * @param {ListPetsRequest} req ListPets request
     * @returns {Promise<ListPetsResponse>} A paged array of pets
     */
    listPets: req => {
      const { query } = req;
      return fetch(`${this.base}/pets`, {
        query,
        // TODO: operation 中是否有 auth 要求，或者有全局的
        //  security:
        //   - bearerAuth: []
        headers: {
          Authorization: this.auth,
        },
      });
    },

    /**
     * Create a pet
     *
     * @param {CreatePetsRequest} req CreatePets request
     * @returns {Promise<CreatePetsResponse>} The Pet created
     */
    createPets: req => {
      const { body } = req;
      if (!body) throw new Error("requestBody is required for CreatePets");

      return fetch(`${this.base}/pets`, {
        body,
        // TODO: operation 中是否有 auth 要求，或者有全局的
        //  security:
        //   - bearerAuth: []
        headers: {
          Authorization: this.auth,
        },
      });
    },

    /**
     * Find pet by id
     *
     * @param {ShowPetByIdRequest} req ShowPetById request
     * @returns {Promise<ShowPetByIdResponse>} Expected response to a valid request
     */

    showPetById: req => {
      const { petId } = req;
      if (!petId) throw new Error("petId is required for ShowPetById");

      return fetch(`${this.base}/pets/${petId}`, {
        // TODO: operation 中是否有 auth 要求，或者有全局的
        //  security:
        //   - bearerAuth: []
        headers: {
          Authorization: this.auth,
        },
      });
    },
  };
}
