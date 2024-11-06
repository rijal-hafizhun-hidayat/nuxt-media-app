<script setup lang="ts">
const props = defineProps<{
  bio: string | null;
}>();

interface Form {
  bio: string;
}
interface Result {
  statusCode: number;
  message: string;
  data: ResultUpdateBio;
}
interface ResultUpdateBio {
  bio: string;
}
interface Validation {
  statusCode: number;
  errors: Record<string, string[]>;
}

const { $api, $swal } = useNuxtApp();
const isLoading: Ref<boolean> = ref(false);
const validation: Ref<Validation | null> = ref(null);
const form: Form = reactive({
  bio: props.bio ?? "",
});
const update = async () => {
  try {
    isLoading.value = true;
    const result: Result = await $api("profile/update-bio", {
      method: "patch",
      body: {
        bio: form.bio,
      },
    });

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
      <h1 class="font-bold mb-4">Update Bio</h1>
      <form @submit.prevent="update()" class="space-y-4">
        <div>
          <BaseInputLabel>Biografi</BaseInputLabel>
          <BaseTextInput
            type="text"
            class="block mt-1 w-full"
            v-model="form.bio"
          />
          <BaseInputError
            v-if="
              validation &&
              validation.statusCode === 400 &&
              validation.errors.bio
            "
            :message="validation.errors.bio[0]"
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
