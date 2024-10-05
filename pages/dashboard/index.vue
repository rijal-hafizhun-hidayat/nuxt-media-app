<script setup>
console.log(true);
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
            Beranda
          </h2>
        </div>
        <div>
          <BasePrimaryButton type="button">Buat Postingan</BasePrimaryButton>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>
