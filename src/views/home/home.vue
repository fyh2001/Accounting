<template>
  <div>
    <Background>
      <div class="py-2 px-5">
        <!-- 标题 -->
        <div class="mb-2 text-4.5 text-white">日常账本</div>
        <!-- 支出数据分析 -->
        <rounded-containers class="mb-4">
          <div>
            <!-- 标题与更多 -->
            <div class="flex justify-between">
              <!-- 标题 -->
              <div class="text-2.8 text-gray-4">7月支出</div>
              <!-- 更多按钮 -->
              <MoreButtons />
            </div>
            <!-- 数据分析 -->
            <div class="flex items-center">
              <!-- 总金额 -->
              <div class="text-7 font-bold" style="color: #fd6b7c">
                {{
                  accountStore.accountList.length > 0
                    ? accountStore.monthlyExpenditureTotal[
                        time.getCurrentYearMonth()
                      ] * -1
                    : "暂无数据"
                }}
              </div>
              <!-- 变化百分比 -->
              <div
                class="translate-y-2 translate-x-1 text-2.4"
                style="color: #41aba5"
              >
                +0.0%
              </div>
            </div>
            <Statistics />
          </div>
        </rounded-containers>
        <!-- 今日交易 -->
        <rounded-containers class="mb-4" v-if="getTodayAccount.length > 0">
          <div class="">
            <!-- 标题与更多 -->
            <div class="flex justify-between mb-4">
              <!-- 标题 -->
              <div class="text-4 font-bold">今日交易</div>
              <!-- 更多按钮 -->
              <MoreButtons />
            </div>
            <!-- 交易 -->
            <div class="flex flex-col gap-y-4">
              <div
                class="flex justify-between items-center"
                v-for="(data, index) in getTodayAccount.slice(0.4)"
              >
                <!-- left -->
                <div class="flex items-center">
                  <div
                    class="mr-2 w-2 h-2 rounded-full"
                    :style="{
                      backgroundColor:
                        data.account_classification === 'income'
                          ? '#01c3b1'
                          : '#fd6f77',
                    }"
                  />
                  <div>
                    <div class="text-4">{{ data.use_classification }}</div>
                    <div class="text-3 text-gray-4">{{ data.date }}</div>
                  </div>
                </div>
                <!-- right -->
                <div>
                  <div
                    class="text-4"
                    :style="{
                      color:
                        data.account_classification === 'income'
                          ? '#01c3b1'
                          : '#000',
                    }"
                  >
                    {{
                      data.account_classification === "income"
                        ? "" + data.money
                        : "-" + data.money
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </rounded-containers>
        <!-- 最近交易 -->
        <rounded-containers class="mb-4" v-if="getTodayAccount.length === 0">
          <div class="">
            <!-- 标题与更多 -->
            <div class="flex justify-between mb-4">
              <!-- 标题 -->
              <div class="text-4 font-bold">最近交易</div>
              <!-- 更多按钮 -->
              <MoreButtons />
            </div>
            <!-- 交易 -->
            <div
              class="flex flex-col gap-y-4"
              v-if="getRecentAccount.length > 0"
            >
              <div
                class="flex justify-between items-center"
                v-for="(data, index) in getRecentAccount.slice(0, 4)"
              >
                <!-- left -->
                <div class="flex items-center">
                  <div
                    class="mr-2 w-2 h-2 rounded-full"
                    :style="{
                      backgroundColor:
                        data.account_classification === 'income'
                          ? '#01c3b1'
                          : '#fd6f77',
                    }"
                  />
                  <div>
                    <div class="text-4">{{ data.use_classification }}</div>
                    <div class="text-3 text-gray-4">{{ data.date }}</div>
                  </div>
                </div>
                <!-- right -->
                <div>
                  <div
                    class="text-4"
                    :style="{
                      color:
                        data.account_classification === 'income'
                          ? '#01c3b1'
                          : '#000',
                    }"
                  >
                    {{
                      data.account_classification === "income"
                        ? "" + data.money
                        : "-" + data.money
                    }}
                  </div>
                </div>
              </div>
            </div>
            <!-- 无数据时 -->
            <div
              class="flex justify-center items-center"
              v-if="getRecentAccount == 0"
            >
              <div class="text-4 text-gray-4">暂无数据</div>
            </div>
          </div>
        </rounded-containers>
        <!-- 添加按钮 -->
        <add-button
          :bottom="'3rem'"
          :right="'1.25rem'"
          @click="router.push('/createAccount')"
        />
      </div>
    </Background>
  </div>
</template>

<script setup>
import Background from "../../components/home/Background.vue";
import RoundedContainers from "../../components/home/RoundedContainers.vue";
import MoreButtons from "../../components/home/MoreButtons.vue";
import Statistics from "../../components/home/Statistics.vue";
import AddButton from "../../components/home/AddButton.vue";
import accountApi from "../../api/accountApi";
import time from "../../utils/timeHandler";
import router from "../../router/router";
import { useAccountStore } from "../../store/accountStore";
import { onMounted, ref } from "vue";

const accountStore = useAccountStore();

/**
 * 上传账单数据
 */
const uploadAccounts = async () => {
  // 上次上传时间
  const lastUploadTime = localStorage.getItem("lastUploadTime");

  // 如果是第一次上传，则上传全部数据
  if (!lastUploadTime) {
    const res = await accountApi.uploadAccounts(accountStore.accountList);
    if (res.code !== 200) {
      window.$message.error("云同步失败，请稍后重试");
      return;
    }

    // 存储当前时间作为上次上传时间
    localStorage.setItem("lastUploadTime", time.getUnix().toString());
    window.$message.success(
      "云同步成功，本次同步了" + accountStore.accountList.length + "条数据"
    );
    return;
  }

  // 过滤出大于上次上传时间的数据
  const filteredAccounts = accountStore.accountList.filter(
    (account) => account.create_time > parseInt(lastUploadTime)
  );

  if (filteredAccounts.length > 0) {
    const res = await accountApi.uploadAccounts(filteredAccounts);
    if (res.code !== 200) {
      window.$message.error("云同步失败，请稍后重试");
      return;
    }

    // 存储当前时间作为上次上传时间
    localStorage.setItem("lastUploadTime", time.getUnix().toString());
    window.$message.success(
      "云同步成功，本次同步了" + filteredAccounts.length + "条数据"
    );
  }
};

/**
 * 更新账本数据
 */
const updateAccount = async () => {
  // 上次更新时间
  const lastUpdateTime = localStorage.getItem("lastUpdateTime");

  // 如果是第一次更新，则更新全部数据
  if (!lastUpdateTime) {
    const res = await accountApi.getAllAccount();
    console.log(res);

    if (res.code !== 200) {
      window.$message.error("云同步失败，请稍后重试");
      return;
    }

    // 存储当前时间作为上次更新时间
    localStorage.setItem("lastUpdateTime", time.getUnix().toString());
    accountStore.updateAccountList(res.data);
    return;
  }

  // 若不是第一次更新，则更新大于上次更新时间的数据
  const res = await accountApi.getAdditionalData(parseInt(lastUpdateTime));
  console.log(res);
  if (res.code !== 200) {
    window.$message.error("云同步失败，请稍后重试");
    return;
  }

  // 存储当前时间作为上次更新时间
  localStorage.setItem("lastUpdateTime", time.getUnix().toString());
  accountStore.addAccounts(res.data);
};

/**
 * 从本地缓存中获取今日账本
 */
const getTodayAccount = computed(() => {
  return accountStore.accountList
    .filter((item) => time.isToday(item.date)) // 今日
    .sort((a, b) => b.date - a.date) // 降序
    .map((item) => ({ ...item, date: time.getLastTime(item.date) })); // 格式化时间
});

/**
 * 从本地缓存中获取最近账本
 */
const getRecentAccount = computed(() => {
  return accountStore.accountList
    .sort((a, b) => b.date - a.date) // 降序
    .map((item) => ({ ...item, date: time.getLastMonthDate(item.date) })); // 格式化时间
});

onMounted(() => {
  // updateAccount();
  console.log(accountStore.accountList);
  if (accountStore.accountList.length !== 0) uploadAccounts();
  updateAccount();
  console.log(time.getUnix())
});
</script>
