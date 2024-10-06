<script setup lang="ts">
const props = defineProps<{
  name: string;
}>();

interface Form {
  name: string;
}
const { $api } = useNuxtApp();
const form: Form = reactive({
  name: props.name,
});

const update = async () => {
  try {
    const result = await $api("profile/update-name", {
      method: "patch",
      body: {
        name: form.name,
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
      <h1 class="font-bold mb-4">Update Profile</h1>
      <div class="whitespace-nowrap">
        <form @submit.prevent="update()" class="space-y-4">
          <div>
            <BaseInputLabel>Full Name</BaseInputLabel>
            <BaseTextInput
              v-model="form.name"
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
