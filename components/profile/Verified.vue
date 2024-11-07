<script setup lang="ts">
const props = defineProps<{
  emailVerifiedAt: Date | null;
}>();

const { $api, $swal } = useNuxtApp();
const validation: Ref<any> = ref([]);
const emailVerifiedAt: Ref<Date | null> = ref(props.emailVerifiedAt);

const update = async () => {
  try {
    const result = await $api("profile/verif", {
      method: "patch",
    });

    console.log(result);
  } catch (error: any) {
    if (error.data && error.data.statusCode === 400) {
      validation.value = error.data;
    } else if (error.data && error.data.statusCode === 404) {
      $swal.fire({
        title: "error",
        text: error.data.errors,
        icon: "error",
      });
    }
  }
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
      <h1 class="font-bold mb-4">Verification User</h1>
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
