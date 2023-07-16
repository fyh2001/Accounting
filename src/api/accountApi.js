import request from "../utils/axios";

export default {
  baseURL: "/account",

  /**
   * 新增账单
   * @param {*} account 账单信息
   * @returns 新增结果
   */
  addAccount(account) {
    return request({
      method: "POST",
      url: `${this.baseURL}/addAccount`,
      data: account,
    });
  },

  /**
   * 查询所有账单
   * @returns 账单列表
   */
  getAllAccount(){
    return request({
      method: "GET",
      url: `${this.baseURL}/getAllAccount`,
    })
  }
};
