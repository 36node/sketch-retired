import { TOKEN } from "../config";

/**
 * fake auth sdk
 */

export default class SDK {
  base;

  constructor(opt = {}) {
    this.base = opt.base || "";
  }

  session = {
    deleteSession: req => {
      return new Promise(resolve => {
        resolve();
      });
    },
    createSession: req => {
      return new Promise((resolve, reject) => {
        resolve({
          body: {
            user: {
              email: "example@36node.com",
              username: "example@36node.com",
              nickname: "36node",
            },
            token: TOKEN,
          },
        });
      });
    },
  };
}
