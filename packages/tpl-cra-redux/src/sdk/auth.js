/**
 * fake auth sdk
 */

const fakeSession = {
  active: true,
  client: "app",
  createdAt: "2019-05-02T05:59:00.729Z",
  device: "iphone x",
  expiredAt: "2019-05-09T05:59:00.728Z",
  id: "5ccd27facb8561b30bd057d6",
  login: "developer@36node.com",
  method: "PASSWORD",
  ns: ["/36node"],
  profile: {
    email: "admin@36node.com",
    username: "36node-admin",
    name: "张三",
    nickname: "robin",
    phone: "12345678901",
  },
  provider: "5cb9a4edc48ad400120d28a7",
  roles: [{ name: "ADMIN", ns: "/36node" }],
  token: "xxxxxxx",
  updatedAt: "2019-05-02T05:59:00.729Z",
  user: "5cb9a4edc48ad400120d28a7",
};

export default class SDK {
  base;

  constructor(opt = {}) {
    this.base = opt.base || "";
  }

  session = {
    deleteSession: req => {
      return new Promise(resolve => {
        resolve({ headers: { status: 204 }, body: {} });
      });
    },
    createSession: req => {
      return new Promise((resolve, reject) => {
        resolve({
          body: fakeSession,
        });
      });
    },
    getSession: req => {
      return new Promise((resolve, reject) => {
        resolve({
          body: fakeSession,
        });
      });
    },
    unauth: req => {
      return new Promise((resolve, reject) => {
        reject({
          status: 401,
          msg: "Authorization expired",
        });
      });
    },
  };
}
