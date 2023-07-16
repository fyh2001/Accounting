<template>
  <div class="grid grid-cols-3 gap-4">
    <div
      class="p-1.5 rounded-xl text-center transition-colors duration-200"
      :style="{
        borderStyle: 'solid',
        borderWidth: '0.1px',
        borderColor:
          data.value === modelValue ? buttonSelectedBorder : buttonBorder,
        color:
          data.value === modelValue ? buttonSelectedTextColor : buttonTextColor,
        backgroundColor:
          data.value === modelValue
            ? buttonSelectedBackgroundColor
            : buttonBackgroundColor,
      }"
      v-for="(data, index) in buttonList"
      @click="
        () => {
          emit('update:modelValue', data.value);
        }
      "
    >
      {{ data.label }}
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  // 按钮列表
  buttonList: {
    type: Array,
    required: true,
    default: () => [],
  },
  // 每行显示的按钮数量
  itemsInRow: {
    type: Number,
    default: 3,
  },
  buttonBorder: {
    type: String,
    default: "none",
  },
  buttonSelectedBorder: {
    type: String,
    default: "none",
  },
  buttonTextColor: {
    type: String,
    default: "#000",
  },
  buttonSelectedTextColor: {
    type: String,
    default: "#fff",
  },
  buttonBackgroundColor: {
    type: String,
    default: "#fff",
  },
  buttonSelectedBackgroundColor: {
    type: String,
    default: "#00c3b3",
  },
  modelValue: {
    type: String,
  },
});
</script>

<style></style>
