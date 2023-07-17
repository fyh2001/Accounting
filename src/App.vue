<template>
  <GlobalProvider>
    <!-- 填充状态栏 -->
    <div
      class="w-full z-999"
      :style="{ height: navHeight + 'px', backgroundColor: '#00c3b3' }"
    />

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </GlobalProvider>
</template>

<script setup>
import { onMounted, ref } from "vue";
import GlobalProvider from "./components/GlobalProvider.vue";

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

const navHeight = ref(0);

onMounted(() => {
  // 设置状态栏高度
  navHeight.value = getStatusBarHeight();
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 150ms linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
