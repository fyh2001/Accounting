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
   * 批量上传账单
   * @param {*} accounts 账单列表
   * @returns 上传结果
   */
  uploadAccounts(accounts) {
    return request({
      method: "POST",
      url: `${this.baseURL}/uploadAccounts`,
      data: accounts,
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
  },

  /**
   * 获取增量数据
   * @param {*} timestamp 时间戳
   * @returns 增量数据
   */
  getAdditionalData(timestamp){
    return request({
      method: "GET",
      url: `${this.baseURL}/getAdditionalData/${timestamp}`,
    })
  }
};
