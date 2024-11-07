<script setup lang="ts">
interface Form {
  newPassword: string;
  oldPassword: string;
}
interface Validation {
  statusCode: number;
  errors: Record<string, string[]>;
}
interface Result {
  statusCode: number;
  message: string;
}

const isLoading: Ref<boolean> = ref(false);
const { $api, $swal } = useNuxtApp();
const validation: Ref<Validation | null> = ref(null);
const form: Form = reactive({
  oldPassword: "",
  newPassword: "",
});

const update = async () => {
  try {
    isLoading.value = true;
    const result: Result = await $api("profile/update-password", {
      method: "patch",
      body: {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      },
    });

    form.newPassword = "";
    form.oldPassword = "";

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
    isLoading.value = false;
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
      <h1 class="font-bold mb-4">Update Password</h1>
      <form @submit.prevent="update()" class="space-y-4">
        <div>
          <BaseInputLabel
            >masukkan konfirmasi password(menggunakan password
            lama)</BaseInputLabel
          >
          <BaseTextInput
            v-model="form.oldPassword"
            type="password"
            class="mt-1 block w-full"
          />
          <BaseInputError
            v-if="
              validation &&
              validation.statusCode === 400 &&
              validation.errors.oldPassword
            "
            :message="validation.errors.oldPassword[0]"
          />
        </div>
        <div>
          <BaseInputLabel>masukkan password baru</BaseInputLabel>
          <BaseTextInput
            v-model="form.newPassword"
            type="password"
            class="mt-1 block w-full"
          />
          <BaseInputError
            v-if="
              validation &&
              validation.statusCode === 400 &&
              validation.errors.newPassword
            "
            :message="validation.errors.newPassword[0]"
          />
        </div>
        <div>
          <BasePrimaryButton
            :disabled="isLoading == true"
            :class="{ 'opacity-75': isLoading == true }"
            type="submit"
            >Simpan</BasePrimaryButton
          >
        </div>
      </form>
    </div>
  </div>
</template>
