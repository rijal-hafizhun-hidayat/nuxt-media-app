<script setup lang="ts">
const props = defineProps<{
  bio: string;
}>();
interface Form {
  bio: string;
}
const { $api } = useNuxtApp();
const isLoading: Ref<boolean> = ref(false);
const validation: Ref<any> = ref([]);
const form: Form = reactive({
  bio: props.bio || "",
});
const update = async () => {
  try {
    isLoading.value = true;
    const result = await $api("profile/update-bio", {
      method: "patch",
      body: {
        bio: form.bio,
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
      <h1 class="font-bold mb-4">Update Bio</h1>
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
          <BaseInputLabel>Biografi</BaseInputLabel>
          <BaseTextInput
            type="text"
            class="block mt-1 w-full"
            v-model="form.bio"
          />
          <BaseInputError
            v-if="validation.statusCode === 400 && validation.errors.bio"
            :message="validation.errors.bio._errors[0]"
          />
        </div>
        <div>
          <BasePrimaryButton
            :disabled="isLoading == true"
            :class="{ 'opacity-75': isLoading == true }"
            type="submit"
            >simpan</BasePrimaryButton
          >
        </div>
      </form>
    </div>
  </div>
</template>
