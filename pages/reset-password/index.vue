<script setup lang="ts">
interface Form {
  email: string;
}

const router = useRouter();
const { $api } = useNuxtApp();
const isLoading: Ref<boolean> = ref(false);
const validation: Ref<any> = ref([]);
const form: Form = reactive({
  email: "",
});

const generateToken = async () => {
  try {
    isLoading.value = true;
    const result = await $api("reset-password", {
      method: "post",
      body: {
        email: form.email,
      },
    });

    console.log(result);
    validation.value = result;

    return router.push({
      name: "reset-password-update",
      query: {
        email: form.email,
      },
    });
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
    <form @submit.prevent="generateToken()" class="space-y-4">
      <div>
        <BaseInputLabel>Masukkan Email</BaseInputLabel>
        <BaseTextInput
          v-model="form.email"
          type="email"
          class="block w-full mt-1"
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
          >submit</BasePrimaryButton
        >
      </div>
    </form>
  </NuxtLayout>
</template>
