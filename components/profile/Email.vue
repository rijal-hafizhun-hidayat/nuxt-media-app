<script setup lang="ts">
const props = defineProps<{
  email: string;
}>();

interface Form {
  email: string;
  newEmail: string;
}
const isLoading: Ref<boolean> = ref(false);
const validation: Ref<any> = ref([]);
const { $api } = useNuxtApp();
const form: Form = reactive({
  email: props.email,
  newEmail: "",
});

const update = async () => {
  try {
    isLoading.value = true;
    const result = await $api("profile/update-email", {
      method: "patch",
      body: {
        email: form.newEmail,
      },
    });

    validation.value = result;
    console.log(validation.value);
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
      <h1 class="font-bold mb-4">Update Email</h1>
      <BaseSuccessAlert
        v-if="validation.statusCode === 200"
        :message="validation.message"
      />
      <BaseDangerAlert
        v-if="validation.statusCode === 404"
        :message="validation.errors"
      />
      <form @submit.prevent="update()" class="space-y-4">
        <div>
          <BaseInputLabel>active email</BaseInputLabel>
          <BaseTextInput
            disabled
            v-model="form.email"
            type="email"
            class="mt-1 block w-full"
          />
        </div>
        <div>
          <BaseInputLabel>new email</BaseInputLabel>
          <BaseTextInput
            v-model="form.newEmail"
            type="email"
            class="mt-1 block w-full"
          />
          <BaseInputError
            v-if="validation.statusCode === 400 && validation.errors.email"
            :message="validation.errors.email._errors[0]"
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
