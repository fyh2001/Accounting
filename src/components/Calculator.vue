<template>
  <div class="fixed top-0 w-screen h-screen" v-if="show">
    <!-- 深色遮罩 -->
    <Transition name="window">
      <div
        class="top-0 left-0 w-full h-full bg-black opacity-60 z-10"
        @click="emit('close')"
        v-if="show"
      />
    </Transition>

    <!-- 计算器 -->
    <Transition name="calculator">
      <div class="fixed bottom-0 left-0 w-full bg-white z-20" v-if="show">
        <!-- 数值显示 -->
        <div class="flex py-2 px-8 border-b-0.5 text-9" style="color: #00c3b3">
          <div class="mr-6">¥</div>
          <div>{{ value }}</div>
        </div>
        <!-- 功能按键 -->
        <div
          id="calculatorButton"
          class="grid grid-cols-4 items-center justify-items-center text-7"
        >
          <!-- <div class="py-2">C</div> -->
          <div
            class="flex items-center justify-center py-4 w-full h-full rounded transition-all"
            v-for="(data, index) in calculatorButton.slice(0, 15)"
            @touchstart="touchStart(index)"
            @touchend="touchEnd(index)"
            @click="touchButtonHandler(data.value)"
          >
            <n-icon :component="data.component" />
          </div>
          <div
            class="flex justify-center items-center row-span-2 w-full h-full rounded text-white transition-all"
            style="background-color: #00c3b3"
            @touchstart="touchStart(15)"
            @touchend="touchEnd(15)"
            @click="touchButtonHandler('OK')"
            v-if="!showEqualButton"
          >
            <div>OK</div>
          </div>
          <div
            class="flex justify-center items-center row-span-2 w-full h-full rounded text-white transition-all"
            style="background-color: #00c3b3"
            @touchstart="touchStart(15)"
            @touchend="touchEnd(15)"
            @click="touchButtonHandler('=')"
            v-if="showEqualButton"
          >
            <n-icon :component="Equal" />
          </div>
          <div
            class="flex items-center justify-center py-4 w-full h-full rounded transition-all"
            v-for="(data, index) in calculatorButton.slice(15)"
            @touchstart="touchStart(index + 16)"
            @touchend="touchEnd(index + 16)"
            @click="touchButtonHandler(data.value)"
          >
            <n-icon :component="data.component" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import {
  Divide,
  Plus,
  Minus,
  Parentheses,
  X,
  Backspace,
  LetterC,
  Point,
  Equal,
} from "@vicons/tabler";
import {
  Number0,
  Number1,
  Number2,
  Number3,
  Number4,
  Number5,
  Number6,
  Number7,
  Number8,
  Number9,
} from "@vicons/carbon";

const emit = defineEmits(["close", "update:value"]);

const props = defineProps({
  show: Boolean,
  value: {
    type: String,
    default: "0",
  },
});

// 按键配置
const calculatorButton = [
  {
    component: LetterC,
    value: "clear",
  },
  {
    component: Divide,
    value: "÷",
  },
  {
    component: X,
    value: "×",
  },
  {
    component: Backspace,
    value: "backspace",
  },
  {
    component: Number7,
    value: "7",
  },
  {
    component: Number8,
    value: "8",
  },
  {
    component: Number9,
    value: "9",
  },
  {
    component: Minus,
    value: "-",
  },
  {
    component: Number4,
    value: "4",
  },
  {
    component: Number5,
    value: "5",
  },
  {
    component: Number6,
    value: "6",
  },
  {
    component: Plus,
    value: "+",
  },
  {
    component: Number1,
    value: "1",
  },
  {
    component: Number2,
    value: "2",
  },
  {
    component: Number3,
    value: "3",
  },
  {
    component: Parentheses,
    value: "()",
  },
  {
    component: Number0,
    value: "0",
  },
  {
    component: Point,
    value: ".",
  },
];

/**
 * 按键触摸事件
 * @param {*} index 按键索引
 */
const touchStart = (index) => {
  document.getElementById("calculatorButton").children[
    [index]
  ].style.backgroundColor = index === 15 ? "#019a8c" : "#e5e5e5";
};

/**
 * 按键触摸结束事件
 * @param {*} index 按键索引
 */
const touchEnd = (index) => {
  document.getElementById("calculatorButton").children[
    [index]
  ].style.backgroundColor = index === 15 ? "#00c3b3" : "#fff";
};

/**
 * 按键点击事件
 * @param {*} value 按键值
 */
const touchButtonHandler = (value) => {
  console.log(value);
  let expression = props.value;
  switch (value) {
    case "clear":
      emit("update:value", "0");
      break;
    case "backspace":
      emit("update:value", expression.slice(0, -1));
      break;
    case "OK":
      emit("close");
      break;
    case "=":
      expression = expression.replace(/×/g, "*").replace(/÷/g, "/");

      let result = eval(expression).toFixed(2);
      if (result < 0) {
        result = result * -1;
      }

      emit("update:value", result.toString());

      showEqualButton.value = false;
      break;
    case "+":
      if (
        expression.charAt(expression.length - 1) === "+" ||
        expression.charAt(expression.length - 1) === "-" ||
        expression.charAt(expression.length - 1) === "×" ||
        expression.charAt(expression.length - 1) === "÷"
      ) {
        break;
      }

      showEqualButton.value = true;
      emit("update:value", expression + value);
      break;
    case "-":
      if (
        expression.charAt(expression.length - 1) === "+" ||
        expression.charAt(expression.length - 1) === "-" ||
        expression.charAt(expression.length - 1) === "×" ||
        expression.charAt(expression.length - 1) === "÷"
      ) {
        break;
      }

      showEqualButton.value = true;
      emit("update:value", expression + value);
      break;
    case "×":
      if (
        expression.charAt(expression.length - 1) === "+" ||
        expression.charAt(expression.length - 1) === "-" ||
        expression.charAt(expression.length - 1) === "×" ||
        expression.charAt(expression.length - 1) === "÷"
      ) {
        break;
      }

      showEqualButton.value = true;
      emit("update:value", expression + value);
      break;
    case "÷":
      if (
        expression.charAt(expression.length - 1) === "+" ||
        expression.charAt(expression.length - 1) === "-" ||
        expression.charAt(expression.length - 1) === "×" ||
        expression.charAt(expression.length - 1) === "÷"
      ) {
        break;
      }

      showEqualButton.value = true;
      emit("update:value", expression + value);
      break;
    case "()":
      //   showEqualButton.value = true;
      //   emit("update:value", expression + value);
      break;
    default:
      // showEqualButton.value = false;
      emit("update:value", expression === "0" ? value : expression + value);
      break;
  }
};

const showEqualButton = ref(false);
</script>

<style>
.window-enter-active,
.window-leave-active {
  transition: opacity 0.5s ease;
}

.window-enter-from,
.window-leave-to {
  opacity: 0;
}

.calculator-enter-active,
.calculator-leave-active {
  transition: transform 0.5s ease;
}

.calculator-enter-from,
.calculator-leave-to {
  transform: translateY(100%);
}
</style>
