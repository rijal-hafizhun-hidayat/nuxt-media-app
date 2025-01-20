<script setup lang="ts">
const props = defineProps<{
  emailVerifiedAt: Date | null;
}>();

interface Result {
  statusCode: number;
  message: string;
  data: ResultVerif;
}
interface ResultVerif {
  email_verified_at: Date | null;
}

const { $api, $swal } = useNuxtApp();
const validation: Ref<any> = ref([]);
const emailVerifiedAt: Ref<Date | null> = ref(props.emailVerifiedAt);

const update = async () => {
  try {
    const result: Result = await $api("profile/verif", {
      method: "patch",
    });

    emailVerifiedAt.value = result.data.email_verified_at;

    $swal.fire({
      title: "success",
      text: result.message,
      icon: "success",
    });
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
            <BasePrimaryButton v-if="emailVerifiedAt === null" type="submit"
              >Verif User</BasePrimaryButton
            >
            <BaseSuccessButton v-else type="button"
              >User Already Verified</BaseSuccessButton
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
