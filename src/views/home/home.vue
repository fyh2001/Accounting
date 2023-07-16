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
              <div class="text-7 font-bold" style="color: #fd6b7c">{{ accountStore.monthlyExpenditureTotal[time.getCurrentYearMonth()] * -1 }}</div>
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
                      color: data.account_classification === 'income' ? '#01c3b1' : '#000',
                    }"
                  >
                    {{ data.account_classification === 'income' ? '' + data.money : '-' + data.money }}
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
            <div class="flex flex-col gap-y-4">
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
                      color: data.account_classification === 'income' ? '#01c3b1' : '#000',
                    }"
                  >
                    {{ data.account_classification === 'income' ? '' + data.money : '-' + data.money }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </rounded-containers>
      </div>
    </Background>
  </div>
</template>

<script setup>
import Background from "../../components/home/Background.vue";
import RoundedContainers from "../../components/home/RoundedContainers.vue";
import MoreButtons from "../../components/home/MoreButtons.vue";
import Statistics from "../../components/home/Statistics.vue";
import accountApi from "../../api/accountApi";
import time from "../../utils/timeHandler";
import { useAccountStore } from "../../store/accountStore";
import { onMounted, ref } from "vue";

const accountStore = useAccountStore();

/**
 * 更新账本数据
 */
const updateAccount = async () => {
  const res = await accountApi.getAllAccount();
  console.log(res)
  // 请求失败
  if (res.code !== 200) {
    return;
  }
  // 请求成功
  await accountStore.updateAccountList(res.data);
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
  updateAccount();
});
</script>
