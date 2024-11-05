<script setup lang="ts">
interface Result {
  statusCode: number;
  message: string;
  data: ResultResetPassword;
}
interface ResultResetPassword {
  expired_at: Date;
  token: number;
}
interface Validation {
  statusCode: number;
  errors: Record<string, string[]>;
}
interface Form {
  token: string;
  password: string;
  email: string;
}

const router = useRouter();
const route = useRoute();
const { $api, $swal } = useNuxtApp();
const validation: Ref<Validation | null> = ref(null);
const isLoadingReSendToken: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);
const form: Form = reactive({
  token: "",
  password: "",
  email: route.query.email as string,
});

const updatePassword = async () => {
  try {
    isLoading.value = true;
    const result: Result = await $api("reset-password/update", {
      method: "patch",
      body: {
        token: parseInt(form.token),
        password: form.password,
      },
    });

    $swal.fire({
      title: "success",
      text: result.message,
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

const reSendToken = async () => {
  try {
    isLoadingReSendToken.value = true;
    const result: Result = await $api("reset-password", {
      method: "post",
      body: {
        email: form.email,
      },
    });

    $swal.fire({
      title: "success",
      text: result.message,
      icon: "success",
    });
  } catch (error: any) {
    isLoadingReSendToken.value = false;
    if (error.data) {
      $swal.fire({
        title: "error",
        text: error.data.errors,
        icon: "error",
      });
    }
  } finally {
    isLoadingReSendToken.value = false;
  }
};

const loginPage = async () => {
  await router.push({
    name: "index",
  });
};

const numbersOnly = (evt: any) => {
  //   evt = evt ? evt : window.event;
  var charCode = evt.which ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
    evt.preventDefault();
  } else {
    return true;
  }
};
</script>
<template>
  <NuxtLayout name="login-layout">
    <BaseInfoAlert :message="'silahkan cek email anda'" />
    <form @submit.prevent="updatePassword()" class="space-y-4">
      <div>
        <BaseInputLabel>email</BaseInputLabel>
        <BaseTextInput
          disabled
          v-model="form.email"
          class="bloxk w-full mt-1"
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
        <BaseInputLabel>masukkan token</BaseInputLabel>
        <BaseTextInput
          type="text"
          v-model="form.token"
          @keypress="numbersOnly($event)"
          class="block w-full mt-1"
        />
        <BaseInputError
          v-if="
            validation &&
            validation.statusCode === 400 &&
            validation.errors.token
          "
          :message="validation.errors.token[0]"
        />
      </div>
      <div>
        <BaseInputLabel>masukkan password baru</BaseInputLabel>
        <BaseTextInput
          class="block w-full mt-1"
          v-model="form.password"
          type="password"
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
      <div class="flex space-x-4">
        <div>
          <BasePrimaryButton
            :disabled="isLoading == true"
            :class="{ 'opacity-75': isLoading == true }"
            type="submit"
            >submit</BasePrimaryButton
          >
        </div>
        <div>
          <BasePrimaryButton
            @click="reSendToken()"
            :disabled="isLoadingReSendToken == true"
            :class="{ 'opacity-75': isLoadingReSendToken == true }"
            type="button"
            >re-send otp</BasePrimaryButton
          >
        </div>
        <div>
          <BasePrimaryButton type="button" @click="loginPage()"
            >kembali</BasePrimaryButton
          >
        </div>
      </div>
    </form>
  </NuxtLayout>
</template>
