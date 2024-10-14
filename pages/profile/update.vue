<script setup lang="ts">
definePageMeta({
  middleware: ["auth-middleware"],
});
interface Response {
  statusCode: number;
  message: string;
  data: ResponseProfile | null;
}
interface ResponseProfile {
  bio: string;
  email: string;
  name: string;
}
const response: Ref<Response> = ref({} as Response);
const { data, error } = await useCustomFetch<Response>("profile");

if (data.value) {
  response.value = data.value;
  console.log(response.value);
} else if (error.value) {
  console.log(error.value);
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

    <ProfileUser :name="response.data?.name ?? null" />
    <ProfileBio :bio="response.data?.bio ?? null" />
    <ProfileEmail :email="response.data?.email ?? null" />
    <ProfilePassword />
    <ProfileUpload />
    <ProfileVerified />
  </NuxtLayout>
</template>
