<script setup lang="ts">
const { $api } = useNuxtApp();
interface Form {
  name: string;
  email: string;
  password: string;
}

const validation: Ref<any> = ref([]);
const isLoading: Ref<Boolean> = ref(false);
const form: Form = reactive({
  name: "",
  email: "",
  password: "",
});

const register = async () => {
  try {
    isLoading.value = true;
    const response: any = await $api("/register", {
      method: "post",
      body: {
        name: form.name,
        email: form.email,
        password: form.password,
      },
    });
    validation.value = response;
    console.log(validation.value);
  } catch (error: any) {
    isLoading.value = false;
    //console.log(error.data);
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
    <BaseSuccessAlert
      v-if="validation.statusCode === 200"
      :message="validation.message"
    />
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
            v-if="validation.statusCode === 400 && validation.errors.name"
            :message="validation.errors.name._errors[0]"
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
            autofocus
          />
          <BaseInputError
            v-if="validation.statusCode === 400 && validation.errors.password"
            :message="validation.errors.password._errors[0]"
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
