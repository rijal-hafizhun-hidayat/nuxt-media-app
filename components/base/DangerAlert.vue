<script setup lang="ts">
const props = defineProps<{
  message: Record<string, string[]>;
}>();
</script>
<template>
  <div class="bg-red-500 p-2 rounded mb-3">
    <p class="text-white">{{ props.message }}</p>
  </div>
</template>
