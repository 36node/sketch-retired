import request from "./request";

const dev = window.location.hostname.indexOf("localhost") === -1 ? "" : "https://api.github.com";

class SDK {
  /**
   * 示例，获取
   * @returns {Promise<*>}
   */
  getRepos = () => {
    return request(`${dev}/users/36node/repos`, {});
  };
}

const sdk = new SDK();
export default sdk;
