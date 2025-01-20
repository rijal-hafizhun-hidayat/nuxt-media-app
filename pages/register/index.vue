<script setup lang="ts">
interface Response {
  statusCode: number;
  message: string;
  data: Register;
}
interface Register {
  created_at: Date;
  email: string;
  name: string;
  updated_at: Date;
}
interface Validation {
  statusCode: number;
  errors: Record<string, string[]>;
  message?: Record<string, string[]>;
}
interface Form {
  name: string;
  email: string;
  password: string;
}

const { $api, $swal } = useNuxtApp();
const router = useRouter();
const validation: Ref<Validation | null> = ref(null);
const isLoading: Ref<Boolean> = ref(false);
const form: Form = reactive({
  name: "",
  email: "",
  password: "",
});

const register = async () => {
  try {
    isLoading.value = true;
    const response: Response = await $api("/register", {
      method: "post",
      body: {
        name: form.name,
        email: form.email,
        password: form.password,
      },
    });
    $swal.fire({
      title: "success",
      text: response.message,
      icon: "success",
    });
    await router.push({
      name: "index",
    });
  } catch (error: any) {
    isLoading.value = false;
    if (error.data && error.data.statusCode === 404) {
      validation.value = error.data;
      $swal.fire({
        title: "error",
        text: error.data.errors,
        icon: "error",
      });
    } else if (error.data && error.data.statusCode === 400) {
      validation.value = error.data;
    }
  } finally {
    isLoading.value = false;
  }
};
</script>
<template>
  <NuxtLayout name="login-layout">
    <form @submit.prevent="register()">
      <div class="space-y-4">
        <div>
          <BaseInputLabel>Nama lengkap</BaseInputLabel>
          <BaseTextInput
            type="text"
            class="mt-1 block w-full"
            v-model="form.name"
            autofocus
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
          <BaseInputLabel>Email</BaseInputLabel>
          <BaseTextInput
            type="text"
            class="mt-1 block w-full"
            v-model="form.email"
            autofocus
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
          <BaseInputLabel>Password</BaseInputLabel>
          <BaseTextInput
            type="password"
            class="mt-1 block w-full"
            v-model="form.password"
            autofocus
          />
          <BaseInputError
            v-if="
              validation &&
              validation.statusCode === 400 &&
              validation.errors.password
            "
            :message="validation.errors.password[0]"
          />
        </div>
        <div class="flex justify-end">
          <BasePrimaryButton
            :disabled="isLoading == true"
            :class="{ 'opacity-75': isLoading == true }"
            type="submit"
            >Register</BasePrimaryButton
          >
        </div>
      </div>
    </form>
  </NuxtLayout>
</template>
