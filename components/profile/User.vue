<script setup lang="ts">
const props = defineProps<{
  name: string | null;
}>();

interface Form {
  name: string;
}
const isLoading: Ref<boolean> = ref(false);
const validation: Ref<any> = ref([]);
const { $api } = useNuxtApp();
const form: Form = reactive({
  name: props.name ?? "",
});

const update = async () => {
  try {
    isLoading.value = true;
    const result = await $api("profile/update-name", {
      method: "patch",
      body: {
        name: form.name,
      },
    });

    validation.value = result;
  } catch (error: any) {
    isLoading.value = false;
    validation.value = error.data;
    console.log(validation.value);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
      <h1 class="font-bold mb-4">Update Profile</h1>
      <BaseSuccessAlert
        v-if="validation.statusCode === 200"
        :message="validation.message"
      />
      <form @submit.prevent="update()" class="space-y-4">
        <div>
          <BaseInputLabel>Full Name</BaseInputLabel>
          <BaseTextInput
            v-model="form.name"
            type="text"
            class="mt-1 block w-full"
          />
          <BaseInputError
            v-if="validation.statusCode === 400 && validation.errors.name"
            :message="validation.errors.name._errors[0]"
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
