<script setup lang="ts">
interface Form {
  content: string;
}
interface Result {
  statusCode: number;
  message: string;
  data: ResultPost;
}
interface ResultPost {
  id: number;
  user_id: number;
  content: string;
}
interface Validation {
  statusCode: number;
  errors: Record<string, string[]>;
}

const router = useRouter();
const isLoading: Ref<boolean> = ref(false);
const { $api, $swal } = useNuxtApp();
const validation: Ref<Validation | null> = ref(null);
const form: Form = reactive({
  content: "",
});

const send = async () => {
  try {
    isLoading.value = true;
    const result: Result = await $api("post", {
      method: "post",
      body: {
        content: form.content,
      },
    });
    $swal.fire({
      title: "success",
      text: result.message,
      icon: "success",
    });
    await router.push({
      name: "dashboard",
    });
  } catch (error: any) {
    isLoading.value = false;
    if (error.data && error.data.statusCode === 404) {
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
  <NuxtLayout name="dashboard-layout">
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Tambah Postingan
          </h2>
        </div>
      </div>
    </template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <form @submit.prevent="send()" class="space-y-4">
          <div>
            <BaseInputLabel>Masukkan Isi Postingan</BaseInputLabel>
            <BaseTextAreaInput
              rows="8"
              v-model="form.content"
              class="block mt-1 w-full"
            />
            <BaseInputError
              v-if="
                validation &&
                validation.statusCode === 400 &&
                validation.errors.content
              "
              :message="validation.errors.content[0]"
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
  </NuxtLayout>
</template>
