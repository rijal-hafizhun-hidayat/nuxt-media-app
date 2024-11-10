<script setup lang="ts">
definePageMeta({
  middleware: ["auth-middleware"],
});

const route = useRoute();
const { data } = await useCustomFetch(`post/${route.params.id}`);
if (data.value) {
  console.log(data.value);
}
</script>
<template>
  <NuxtLayout name="dashboard-layout">
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Post
          </h2>
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <p>ini halaman detail post</p>
      </div>
    </div>
  </NuxtLayout>
</template>
