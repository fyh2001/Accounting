<template>
  <div>
    <!-- 顶部导航栏 -->
    <NavBar @exit="router.back()">
      <div class="text-4.5">添加交易</div>
      <template #right>
        <n-icon :component="Check" :size="25" @click="submit" />
      </template>
    </NavBar>

    <!-- 内容 -->
    <div class="py-4 px-6 flex flex-col gap-y-4 bg-white">
      <!-- 账单分类 -->
      <RadioButtonGroup
        v-model="formData.account_classification"
        :button-list="account_classification"
        :buttonBackgroundColor="'#f1f4fb'"
        :button-text-color="'#bfc2c7'"
      />
      <!-- 金额设置 -->
      <MoneyEditBox :value="moneyEditBoxValue" @click="calculatorShow = true" />
      <!-- 用途分类 -->
      <RadioButtonGroup
        v-model="formData.use_classification"
        :button-list="use_classification"
        :button-border="'#e0e0e0'"
        :button-selected-border="'#fe6b7a'"
        :buttonBackgroundColor="'#fff'"
        :button-selected-background-color="'#fff'"
        :button-text-color="'#000'"
        :button-selected-text-color="'#fe6b7a'"
      />
      <!-- 日期时间选择 -->
      <div class="grid grid-cols-2 gap-4">
        <n-date-picker v-model:value="formData.date" type="date" />
        <n-time-picker :default-value="formData.date" format="HH:mm" />
      </div>
      <!-- 备注 -->
      <div>
        <div class="text-3 text-gray-3">备注</div>
        <n-input
          v-model:value="formData.remark"
          type="text"
          placeholder="点击添加备注"
          style="--n-border-radius: 0.75rem"
        />
      </div>
    </div>

    <!-- 保存 -->
    <div class="fixed bottom-5 px-6 w-full h-12" @click="submit">
      <n-button class="w-full h-full" color="#00c3b3" strong round>
        保存
      </n-button>
    </div>

    <!-- 计算器 -->
    <Calculator
      v-model:value="formData.money"
      :show="calculatorShow"
      @close="calculatorShow = false"
    />
  </div>
</template>

<script setup>
import NavBar from "../../components/NavBar.vue";
import Check from "@vicons/tabler/Check";
import RadioButtonGroup from "../../components/RadioButtonGroup.vue";
import MoneyEditBox from "../../components/MoneyEditBox.vue";
import Calculator from "../../components/Calculator.vue";
import time from "../../utils/timeHandler";
import router from "../../router/router";
import { v4 as uuidv4 } from "uuid";
import { useAccountStore } from "../../store/accountStore";
import { onMounted, ref } from "vue";

const accountStore = useAccountStore();

// 账单分类
const account_classification = [
  {
    value: "expenditure",
    label: "支出",
  },
  {
    value: "income",
    label: "收入",
  },
  {
    label: "其他",
    value: "other",
  },
];

// 用途分类
const use_classification = [
  {
    value: "买菜",
    label: "买菜",
  },
  {
    value: "日用",
    label: "日用",
  },
  {
    value: "餐饮",
    label: "餐饮",
  },
  {
    value: "购物",
    label: "购物",
  },
  {
    value: "水果",
    label: "水果",
  },
  {
    value: "交通",
    label: "交通",
  },
  {
    value: "娱乐",
    label: "娱乐",
  },
  {
    value: "医疗",
    label: "医疗",
  },
];

// 表单数据
const formData = ref({
  user_id: 1,
  account_classification: "expenditure",
  use_classification: "买菜",
  money: "0",
  date: time.getUnix(),
  remark: "",
  create_time: time.getUnix(),
  update_time: time.getUnix(),
});

/**
 * 提交表单
 */
const submit = () => {
  formData.value.id = uuidv4(); // 生成随机id

  formData.value.money = parseFloat(formData.value.money); // 将金额转换为浮点数

  const res = accountStore.addAccount(formData.value); // 添加账单

  // 添加成功
  if (res === 200) {
    window.$message.success("添加成功");
    router.back(); // 返回上一页
  }
};

// 计算器显示
const calculatorShow = ref(false);

// 监听金额输入框的值
const moneyEditBoxValue = ref("0");
watch(
  () => formData.value.money,
  (newVal, oldVal) => {
    moneyEditBoxValue.value =
      Number(newVal) + "" != NaN + "" ? newVal : moneyEditBoxValue.value; // 如果输入的值不是数字，则不改变输入框的值
  }
);
onMounted(() => {
  // navHeight.value = getStatusBarHeight();

  // 设置日期选择器和时间选择器的圆角
  document
    .getElementsByClassName("n-date-picker")[0]
    .children[0].style.setProperty("--n-border-radius", "0.75rem");
  document
    .getElementsByClassName("n-time-picker")[0]
    .children[0].style.setProperty("--n-border-radius", "0.75rem");
  // 禁止日期选择器和时间选择器聚焦时弹出键盘
  document
    .getElementsByClassName("n-date-picker")[0]
    .children[0].children[0].children[0].children[0].setAttribute(
      "readOnly",
      true
    );
  document
    .getElementsByClassName("n-time-picker")[0]
    .children[0].children[0].children[0].children[0].setAttribute(
      "readOnly",
      true
    );
});

const navHeight = ref(0);
/**
 * 获得原生状态栏高度
 */
const getStatusBarHeight = () => {
  var immersed = 0;
  var ms = /Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi.exec(
    navigator.userAgent
  );
  if (ms && ms.length >= 3) {
    // 当前环境为沉浸式状态栏模式
    immersed = parseFloat(ms[2]); // 获取状态栏的高度
  }
  return immersed;
};
</script>

<style></style>
