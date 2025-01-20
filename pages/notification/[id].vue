<script setup lang="ts">
definePageMeta({
  middleware: ["auth-middleware"],
});
const route = useRoute();
console.log(route.params.id);
</script>
<template>
  <NuxtLayout name="dashboard-layout">
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Detail Notifikasi
          </h2>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>
