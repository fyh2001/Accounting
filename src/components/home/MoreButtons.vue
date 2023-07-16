<template>
  <div class="relative h-5 w-5 rounded-full" style="background-color: #cef2f0">
    <n-icon
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      :component="ChevronRight"
      size="16"
      color="#0dbaa9"
    />
  </div>
</template>

<script setup>
import ChevronRight from "@vicons/carbon/ChevronRight";
</script>
