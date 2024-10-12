<script setup>
definePageMeta({
  middleware: ["auth-middleware"],
});
const router = useRouter();
const createPost = () => {
  return router.push({
    name: "dashboard-create",
  });
};
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
          <BasePrimaryButton @click="createPost()" type="button"
            >Buat Postingan</BasePrimaryButton
          >
        </div>
      </div>
    </template>

    <PostBase />
  </NuxtLayout>
</template>
