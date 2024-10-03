<script setup lang="ts">
console.log(true);
</script>
<template>
  <NuxtLayout name="dashboard-layout">
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            My Profile
          </h2>
        </div>
      </div>
    </template>

    <ProfileUser />
  </NuxtLayout>
</template>
