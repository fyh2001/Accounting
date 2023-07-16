<template>
  <div class="flex items-center justify-between w-full py-1 border-b-0.5 ">
    <div class="text-9" style="color: #fe6b7a;">-1</div>
    <div class="text-6 text-gray-4">元</div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: 0,
  },
});
</script>
