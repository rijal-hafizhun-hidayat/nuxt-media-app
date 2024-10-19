<script setup lang="ts">
definePageMeta({
  middleware: ["auth-middleware"],
});
</script>
<template>
  <NuxtLayout name="dashboard-layout">
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Notifikasi
          </h2>
        </div>
      </div>
    </template>
    <NotificationBase />
  </NuxtLayout>
</template>
