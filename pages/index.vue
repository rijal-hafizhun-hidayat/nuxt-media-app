<script setup lang="ts">
interface Form {
  email: string;
  password: string;
}

const form: Form = reactive({
  email: "",
  password: "",
});

const login = () => {
  console.log(form);
};
</script>
<template>
  <NuxtLayout name="login-layout">
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
        </div>
        <div>
          <BaseInputLabel>Password</BaseInputLabel>
          <BaseTextInput
            type="password"
            class="mt-1 block w-full"
            v-model="form.password"
            autofocus
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
                  to="/reset"
                  >reset password</NuxtLink
                >
              </p>
            </div>
          </div>

          <BasePrimaryButton type="submit">Login</BasePrimaryButton>
        </div>
      </div>
    </form>
  </NuxtLayout>
</template>
