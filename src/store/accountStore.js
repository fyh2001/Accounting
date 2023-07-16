import { defineStore } from "pinia";
import time from "../utils/timeHandler";

export const useAccountStore = defineStore("user", {
  persist: true,
  state: () => ({
    accountList: [], // 账单列表
    expenditure: {}, // 支出
    income: {}, // 收入
    dailyExpenditureTotal: {}, // 每天的总支出金额
    dailyIncomeTotal: {}, // 每天的总支出金额
    monthlyExpenditureTotal: {}, // 每个月的总支出金额
    monthlyIncomeTotal: {}, // 每个月的总收入金额
  }),
  getters: {
    weeklyExpenditureTotal() {
      const weeklyExpenditureTotal = {};

      // 遍历支出，计算最近7天每天的支出总数
      Object.entries(this.expenditure)
        .filter(([date, money]) => time.isRecentWeek(time.getUnixByTime(date)))
        .map(([date, money]) => (weeklyExpenditureTotal[date] = money));

      return weeklyExpenditureTotal;
    },
  },
  actions: {
    /**
     * 更新账单列表
     * @param {*} newAccountList 新的账单列表
     */
    updateAccountList(newAccountList) {
      this.accountList = newAccountList;
      this.updateExpenditureAndIncome();
      this.calculateMonthlyExpenditureTotalAndIncomeTotal();
      this.calculateDailyExpenditureTotalAndIncomeTotal();
    },

    /**
     * 更新支出和收入
     */
    updateExpenditureAndIncome() {
      const expenditure = {}; //
      const income = {};

      // 遍历账单列表，更新支出和收入
      this.accountList.forEach((account) => {
        const { account_classification, date, money } = account;
        const formattedDate = time.getLastDate(date); // 格式化日期，只保留年月日部分
        if (account_classification === "expenditure") {
          // 更新支出金额
          expenditure[formattedDate] =
            (expenditure[formattedDate] || 0) + money;
        } else if (account_classification === "income") {
          // 更新收入金额
          income[formattedDate] = (income[formattedDate] || 0) + money;
        }
      });

      this.expenditure = expenditure; // 更新支出
      this.income = income; // 更新收入
    },

    /**
     * 计算每天的总支出金额
     */
    calculateDailyExpenditureTotalAndIncomeTotal() {
      const dailyExpenditureTotal = {};
      const dailyIncomeTotal = {};

      // 遍历支出，计算每天的总支出金额
      Object.entries(this.expenditure).forEach(([date, money]) => {
        dailyExpenditureTotal[date] =
          (dailyExpenditureTotal[date] || 0) + money;
      });

      // 遍历收入，计算每天的总收入金额
      Object.entries(this.income).forEach(([date, money]) => {
        dailyIncomeTotal[date] = (dailyIncomeTotal[date] || 0) + money;
      });

      this.dailyExpenditureTotal = dailyExpenditureTotal;
      this.dailyIncomeTotal = dailyIncomeTotal;
    },

    /**
     * 计算每个月的总支出和收入金额
     */
    calculateMonthlyExpenditureTotalAndIncomeTotal() {
      const monthlyExpenditureTotal = {};
      const monthlyIncomeTotal = {};

      // 遍历支出，计算每个月的总支出金额
      Object.entries(this.expenditure).forEach(([date, money]) => {
        const [year, month] = date.split("-");
        const formattedDate = `${year}-${month}`;
        monthlyExpenditureTotal[formattedDate] =
          (monthlyExpenditureTotal[formattedDate] || 0) + money;
      });

      // 遍历收入，计算每个月的总收入金额
      Object.entries(this.income).forEach(([date, money]) => {
        const [year, month] = date.split("-");
        const formattedDate = `${year}-${month}`;
        monthlyIncomeTotal[formattedDate] =
          (monthlyIncomeTotal[formattedDate] || 0) + money;
      });

      this.monthlyExpenditureTotal = monthlyExpenditureTotal;
      this.monthlyIncomeTotal = monthlyIncomeTotal;
    },
  },
});
