<script setup lang="ts">
const { $api } = useNuxtApp();
const validation: Ref<any> = ref([]);

const update = async () => {
  try {
    const result = await $api("profile/verif", {
      method: "patch",
    });

    validation.value = result;
  } catch (error: any) {
    validation.value = error.data;
    console.log(validation.value);
  }
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
      <h1 class="font-bold mb-4">Verification User</h1>
      <BaseSuccessAlert
        v-if="validation.statusCode === 200"
        :message="validation.message"
      />
      <div class="whitespace-nowrap">
        <form @submit.prevent="update()" class="space-y-4">
          <div>
            <BasePrimaryButton type="submit">Verif User</BasePrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
