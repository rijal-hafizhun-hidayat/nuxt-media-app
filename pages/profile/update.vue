<script setup lang="ts">
definePageMeta({
  middleware: ["auth-middleware"],
});

const response: Ref<any> = ref([]);
const { data } = await useCustomFetch<[]>("profile");

if (data.value) {
  response.value = data.value;
}
</script>
<template>
  <NuxtLayout name="dashboard-layout">
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Update Profile
          </h2>
        </div>
      </div>
    </template>

    <ProfileUser :name="response.data.name" />
    <ProfileBio :bio="response.data.bio" />
    <ProfileEmail :email="response.data.email" />
    <ProfilePassword />
    <ProfileUpload />
    <ProfileVerified />
  </NuxtLayout>
</template>
