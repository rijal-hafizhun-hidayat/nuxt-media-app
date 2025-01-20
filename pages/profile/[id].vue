<script setup lang="ts">
definePageMeta({
  middleware: ["auth-middleware"],
});
const route = useRoute();
const userId: number = parseInt(route.params.id as string);
</script>
<template>
  <NuxtLayout name="dashboard-layout">
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Profile
          </h2>
        </div>
      </div>
    </template>
    <ProfileBadge :isMyProfile="false" :userId="userId" />
    <PostBase :isMyProfile="false" :userId="userId" />
  </NuxtLayout>
</template>
