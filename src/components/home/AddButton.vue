<template>
  <div
    class="box"
    :style="{
      top: top,
      right: right,
      left: left,
      bottom: bottom,
      backgroundColor: backgroundColor,
      boxShadow: boxShadow,
    }"
    @touchstart="touchstart"
    @touchend="touchend"
    v-if="show"
  >
    <n-icon :component="Plus" size="24" color="#fff" />
  </div>
</template>

<script setup>
import Plus from "@vicons/tabler/Plus";

const props = defineProps({
  // 是否显示
  show: {
    type: Boolean,
    default: true,
  },
  top: {
    type: String,
    default: "",
  },
  right: {
    type: String,
    default: "",
  },
  left: {
    type: String,
    default: "",
  },
  bottom: {
    type: String,
    default: "",
  },
});

const backgroundColor = ref("#00c3b3"); // 背景颜色
const boxShadow = ref("rgba(0, 0, 0, 0.24) 0px 3px 8px"); // 阴影

/**
 * 触摸开始
 */
const touchstart = () => {
  backgroundColor.value = "#019a8c";
  boxShadow.value = "rgba(0, 0, 0, 0.35) 0px 10px 20px";
};

/**
 * 触摸结束
 */
const touchend = () => {
  backgroundColor.value = "#00c3b3";
  boxShadow.value = "rgba(0, 0, 0, 0.24) 0px 3px 8px";
};
</script>

<style>
.box {
  @apply absolute flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 z-999;
}
/* .box :hover {
  background-color: #019a8c;
} */
</style>
