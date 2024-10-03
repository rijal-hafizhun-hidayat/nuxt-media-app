<script setup lang="ts">
interface Form {
  email: string;
  password: string;
}

const isLoading: Ref<boolean> = ref(false);
const validation: Ref<any> = ref([]);
const { $api } = useNuxtApp();
const form: Form = reactive({
  email: "",
  password: "",
});

const login = async () => {
  try {
    isLoading.value = true;
    const response = await $api("login", {
      method: "post",
      body: {
        email: form.email,
        password: form.password,
      },
    });

    console.log(response);
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
  <NuxtLayout name="login-layout">
    <BaseDangerAlert
      v-if="validation.statusCode === 404"
      :message="validation.errors"
    />
    <form @submit.prevent="login()">
      <div class="space-y-4">
        <div>
          <BaseInputLabel>Email</BaseInputLabel>
          <BaseTextInput
            type="email"
            class="mt-1 block w-full"
            v-model="form.email"
            autofocus
          />
          <BaseInputError
            v-if="validation.statusCode === 400 && validation.errors.email"
            :message="validation.errors.email._errors[0]"
          />
        </div>
        <div>
          <BaseInputLabel>Password</BaseInputLabel>
          <BaseTextInput
            type="password"
            class="mt-1 block w-full"
            v-model="form.password"
          />
          <BaseInputError
            v-if="validation.statusCode === 400 && validation.errors.password"
            :message="validation.errors.password._errors[0]"
          />
        </div>
        <div class="flex items-center justify-between">
          <div class="flex flex-col space-y-2">
            <div>
              <p class="text-sm">
                Belum memiliki akun? klik
                <NuxtLink
                  class="text-blue-500 underline cursor-pointer"
                  to="/register"
                  >register</NuxtLink
                >
              </p>
            </div>
            <div>
              <p class="text-sm">
                Lupa password? klik
                <NuxtLink
                  class="text-blue-500 underline cursor-pointer"
                  to="/reset-password"
                  >reset password</NuxtLink
                >
              </p>
            </div>
          </div>

          <BasePrimaryButton
            :disabled="isLoading == true"
            :class="{ 'opacity-75': isLoading == true }"
            type="submit"
            >Login</BasePrimaryButton
          >
        </div>
      </div>
    </form>
  </NuxtLayout>
</template>
