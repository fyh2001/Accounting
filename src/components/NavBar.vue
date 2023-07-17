<template>
  <div
    class="flex justify-between p-3"
    style="background-color: #00c3b3; color: white"
  >
    <!-- Left -->
    <div class="flex items-center">
      <n-icon class="mr-4" :component="ArrowLeft" :size="25" color="#fff" @click="emit('exit')"/>
      <div>
        <slot></slot>
      </div>
    </div>
    <!-- Right -->
    <slot name="right"></slot>
  </div>
</template>

<script setup>
import ArrowLeft from "@vicons/tabler/ArrowLeft";
import router from "../router/router";

const emit = defineEmits(["exit"])
</script>

<style></style>
