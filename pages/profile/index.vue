<script setup lang="ts">
definePageMeta({
  middleware: ["auth-middleware"],
});

const { data } = await useCustomFetch<[]>("profile");
console.log(data);
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
    <ProfileEmail />
    <ProfilePassword />
    <ProfileVerified />
  </NuxtLayout>
</template>
