<script setup lang="ts">
type TypeNotification = "LIKE_POST" | "COMMENT_POST";
definePageMeta({
  middleware: ["auth-middleware"],
});
const route = useRoute();
console.log(route.params.id);
const typeNotification: Ref<TypeNotification | null> = ref(
  (route.query.type_notification as TypeNotification) || null
);
console.log(typeNotification.value);
const { data, error } = await useCustomFetch<any>(
  `notification/${route.params.id}`,
  {
    query: {
      type_notification: typeNotification.value,
    },
  }
);

if (data.value) {
  console.log(data.value);
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
            Detail Notifikasi
          </h2>
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>
