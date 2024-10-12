<script setup lang="ts">
definePageMeta({
  middleware: ["auth-middleware"],
});
const response: Ref<any> = ref([]);
const { data } = await useCustomFetch<[]>("profile");

if (data.value) {
  response.value = data.value;
  console.log(response.value);
}
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
    <ProfileBadge
      :bio="response.data.bio"
      :name="response.data.name"
      :avatar="response.data.avatar"
    />
    <PostBase />
  </NuxtLayout>
</template>
