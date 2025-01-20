<script setup lang="ts">
const props = defineProps<{
  email: string | null;
}>();

interface Form {
  email: string;
  newEmail: string;
}
interface Result {
  statusCode: number;
  message: string;
  data: ResultUpdateEmail;
}
interface ResultUpdateEmail {
  email: string;
}
interface Validation {
  statusCode: number;
  errors: Record<string, string[]>;
}

const isLoading: Ref<boolean> = ref(false);
const validation: Ref<Validation | null> = ref(null);
const { $api, $swal } = useNuxtApp();
const form: Form = reactive({
  email: props.email ?? "",
  newEmail: "",
});

const update = async () => {
  try {
    isLoading.value = true;
    const result: Result = await $api("profile/update-email", {
      method: "patch",
      body: {
        email: form.newEmail,
      },
    });

    form.email = result.data.email;
    form.newEmail = "";

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
    //console.log(validation.value);
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
      <h1 class="font-bold mb-4">Update Email</h1>
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
            v-if="
              validation &&
              validation.statusCode === 400 &&
              validation.errors.email
            "
            :message="validation.errors.email[0]"
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
