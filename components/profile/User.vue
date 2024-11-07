<script setup lang="ts">
const props = defineProps<{
  name: string | null;
}>();

interface Form {
  name: string;
}
interface Result {
  statusCode: number;
  message: string;
  data: ResultUpdateName;
}
interface ResultUpdateName {
  name: string;
}
interface Validation {
  statusCode: number;
  errors: Record<string, string[]>;
}

const isLoading: Ref<boolean> = ref(false);
const validation: Ref<Validation | null> = ref(null);
const { $api, $swal } = useNuxtApp();
const form: Form = reactive({
  name: props.name ?? "",
});

const update = async () => {
  try {
    isLoading.value = true;
    const result: Result = await $api("profile/update-name", {
      method: "patch",
      body: {
        name: form.name,
      },
    });

    $swal.fire({
      title: "success",
      text: result.message,
      icon: "success",
    });

    validation.value = null;
  } catch (error: any) {
    if (error.data && error.data.statusCode === 400) {
      validation.value = error.data;
    } else if (error.data && error.data.statusCode === 404) {
      validation.value = error.data;
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
      <h1 class="font-bold mb-4">Update Profile</h1>
      <form @submit.prevent="update()" class="space-y-4">
        <div>
          <BaseInputLabel>Full Name</BaseInputLabel>
          <BaseTextInput
            v-model="form.name"
            type="text"
            class="mt-1 block w-full"
          />
          <BaseInputError
            v-if="
              validation &&
              validation.statusCode === 400 &&
              validation.errors.name
            "
            :message="validation.errors.name[0]"
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
