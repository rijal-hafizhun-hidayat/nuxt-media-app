<script setup lang="ts">
const props = defineProps<{
  email: string;
}>();

interface Form {
  email: string;
  newEmail: string;
}
const { $api } = useNuxtApp();
const form: Form = reactive({
  email: props.email,
  newEmail: "",
});

const update = async () => {
  try {
    const result = await $api("profile/update-email", {
      method: "patch",
      body: {
        email: form.newEmail,
      },
    });

    console.log(result);
  } catch (error: any) {
    console.log(error.data);
  }
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
      <h1 class="font-bold mb-4">Update Email</h1>
      <div class="whitespace-nowrap">
        <form @submit.prevent="update()" class="space-y-4">
          <div>
            <BaseInputLabel>active email</BaseInputLabel>
            <BaseTextInput
              disabled
              v-model="form.email"
              type="text"
              class="mt-1 block w-full"
            />
          </div>
          <div>
            <BaseInputLabel>new email</BaseInputLabel>
            <BaseTextInput
              v-model="form.newEmail"
              type="text"
              class="mt-1 block w-full"
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
