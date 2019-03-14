/// <reference path='.github.d.ts' />

import fetch from "@36node/fetch";

export default class SDK {
  /** @type {string} */
  base;

  /**
   * Init github sdk
   *
   * @param {Object} opt
   * @param {string} opt.base  base url
   */
  constructor(opt = {}) {
    this.base = opt.base || "https://api.github.com";
  }

  /**
   * repo's methods
   */

  repo = {
    /**
     * List all repos
     *
     * @param {ListReposRequest} req listRepos request
     * @returns {Promise<ListReposResponse>} A paged array of repos
     */
    listRepos: req => {
      const { org, query } = req;
      return fetch(`${this.base}/users/${org}/repos`, {
        query,
      });
    },
  };
}
