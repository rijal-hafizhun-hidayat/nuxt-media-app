<script setup lang="ts">
console.log(true);
interface Form {
  email: string;
}

const form: Form = reactive({
  email: "",
});
const resetPassword = () => {
  console.log(form);
};
</script>
<template>
  <NuxtLayout name="login-layout">
    <form @submit.prevent="resetPassword()" class="space-y-4">
      <div>
        <BaseInputLabel>Masukkan Email</BaseInputLabel>
        <BaseTextInput v-model="form.email" class="block w-full mt-1" />
      </div>
      <div>
        <BasePrimaryButton type="submit">submit</BasePrimaryButton>
      </div>
    </form>
  </NuxtLayout>
</template>
