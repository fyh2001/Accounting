<template>
  <div class="flex items-center justify-between w-full py-1 border-b-0.5 ">
    <div class="text-9" style="color: #fe6b7a;">{{ account_classification === 'expenditure' ? value * -1 : value }}</div>
    <div class="text-6 text-gray-4">元</div>
  </div>
</template>

<script setup>
const props = defineProps({
  value:{
    type: String,
    default: '0',
  },

  account_classification: {
    type: String,
    default: "expenditure",
  },
});
</script>
