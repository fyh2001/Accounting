export default {
  /**
   * 获取当前时间戳
   * @returns 当前时间戳
   */
  getUnix() {
    let date = new Date();
    return date.getTime();
  },
  /**
   * 获取今天0点0分0秒的时间戳
   * @returns 今日0点0分0秒的时间戳
   */
  getTodayUnix() {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  /**
   * 获取今日23点59分59秒的时间戳
   * @returns 今日23点59分59秒的时间戳
   */
  getTodayFinalUnix() {
    let date = new Date();
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(999);
    return date.getTime();
  },
  /**
   * 获取昨天0点0分0秒的时间戳
   * @returns 昨天0点0分0秒的时间戳
   */
  getYesterdayUnix() {
    let date = new Date();
    date.setDate(date.getDate() - 1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  /**
   * 根据标准时间获取时间戳
   * @param {*} time 标准时间
   */
  getUnixByTime(time) {
    let date = new Date(time);
    return date.getTime();
  },
  /**
   * 获取标准年月日
   * @param {*} time 时间戳
   * @returns 标准年月日
   */
  getLastDate(time) {
    let date = new Date(time);
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return date.getFullYear() + "-" + month + "-" + day;
  },
  /**
   * 获取标准月日
   * @param {*} time 时间戳
   * @returns 标准月日
   */
  getLastMonthDate(time) {
    let date = new Date(time);
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    return month + "-" + day;
  },
  /**
   * 获取当月年月
   */
  getCurrentYearMonth() {
    let date = new Date();
    let month =
      date.getMonth() + 1 < 10
        ? "0" + (date.getMonth() + 1)
        : date.getMonth() + 1;
    return date.getFullYear() + "-" + month;
  },
  /**
   * 获取标准时分
   * @param {*} time 时间戳
   * @returns 标准时分
   */
  getLastTime(time) {
    let date = new Date(time);
    let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    let minute =
      date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return hour + ":" + minute;
  },
  /**
   * 获取最近七天的时间戳数组
   * @returns 最近七天的时间戳数组
   */
  getRecentWeek() {
    let arr = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() - i); // 获取i天前的日期
      date.setHours(0);
      date.setMinutes(0);
      date.setSeconds(0);
      date.setMilliseconds(0);
      arr.push(date.getTime());
    }
    return arr;
  },
  /**
   * 获取最近七天的年月日数组
   * @returns 最近七天的年月日数组
   */
  getRecentWeekDate() {
    let arr = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() - i); // 获取i天前的日期
      let month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      arr.unshift(date.getFullYear() + "-" + month + "-" + day);
    }
    return arr;
  },
  /**
   * 获取最近七天的月日数组
   * @returns 最近七天的月日数组
   */
  getRecentWeekMonthDate() {
    let arr = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date();
      date.setDate(date.getDate() - i); // 获取i天前的日期
      // let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
      // let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      let month = date.getMonth() + 1;
      let day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      arr.push(month + "." + day);
    }
    return arr;
  },
  /**
   * 判断是否是今天
   * @param {*} time 时间戳
   * @returns 是否是今天
   */
  isToday(time) {
    let date = new Date(time);
    let now = new Date();
    return date.setHours(0, 0, 0, 0) === now.setHours(0, 0, 0, 0);
  },

  /**
   * 判断是否是最近七天
   * @param {*} time 时间戳
   * @returns 是否是最近七天
   */
  isRecentWeek(time) {
    let date = new Date(time);
    let now = new Date();
    return (
      date.setHours(0, 0, 0, 0) >=
      now.setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000
    );
  }
};
