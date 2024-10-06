<script setup lang="ts">
interface Form {
  newPassword: string;
  oldPassword: string;
}
const { $api } = useNuxtApp();
const validation: Ref<any> = ref([]);
const form: Form = reactive({
  oldPassword: "",
  newPassword: "",
});

const update = async () => {
  try {
    const result = await $api("profile/update-password", {
      method: "patch",
      body: {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      },
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
      <h1 class="font-bold mb-4">Update Password</h1>
      <BaseSuccessAlert
        v-if="validation.statusCode === 200"
        :message="validation.message"
      />
      <BaseDangerAlert
        v-if="validation.statusCode === 404"
        :message="validation.errors"
      />
      <div class="whitespace-nowrap">
        <form @submit.prevent="update()" class="space-y-4">
          <div>
            <BaseInputLabel
              >masukkan konfirmasi password(menggunakan password
              lama)</BaseInputLabel
            >
            <BaseTextInput
              v-model="form.oldPassword"
              type="text"
              class="mt-1 block w-full"
            />
            <BaseInputError
              v-if="
                validation.statusCode === 400 && validation.errors.oldPassword
              "
              :message="validation.errors.oldPassword._errors[0]"
            />
          </div>
          <div>
            <BaseInputLabel>masukkan password baru</BaseInputLabel>
            <BaseTextInput
              v-model="form.newPassword"
              type="text"
              class="mt-1 block w-full"
            />
            <BaseInputError
              v-if="
                validation.statusCode === 400 && validation.errors.newPassword
              "
              :message="validation.errors.newPassword._errors[0]"
            />
          </div>
          <div>
            <BasePrimaryButton type="submit">Simpan</BasePrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
