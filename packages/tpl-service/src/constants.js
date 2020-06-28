/**
 * Project/Mileston/Ticket state
 * @enum {string} "OPEN|CLOSED"
 */
export const TAG = {
  CAT: "CAT",
  DOG: "DOG",
};

/**
 * 角色
 * 内置角色 ADMIN 会自动解析成以下所有角色
 * 内置角色 USER 为白板
 *
 * @enum {string} "OPEN|CLOSED"
 */
export const Role = {
  /**
   * 固定角色
   */
  PET_STORE_BREEDER: "BREEDER",
  /**
   * 数据角色
   */
  PET_STORE_OWNER: "OWNER",
};
