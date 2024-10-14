<script setup lang="ts">
interface Form {
  content: string;
}
const { $api } = useNuxtApp();
const validation: Ref<any> = ref([]);
const form: Form = reactive({
  content: "",
});
const send = async () => {
  try {
    const result = await $api("post", {
      method: "post",
      body: {
        content: form.content,
      },
    });

    validation.value = result;
  } catch (error: any) {
    validation.value = error.data;
    console.log(validation.value);
  }
};
</script>
<template>
  <NuxtLayout name="dashboard-layout">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <BaseSuccessAlert
          v-if="validation.statusCode === 200"
          :message="validation.message"
        />
        <form @submit.prevent="send()" class="space-y-4">
          <div>
            <BaseInputLabel>Masukkan Isi Postingan</BaseInputLabel>
            <BaseTextAreaInput
              rows="8"
              v-model="form.content"
              class="block mt-1 w-full"
            />
            <BaseInputError
              v-if="validation.statusCode === 400 && validation.errors.content"
              :message="validation.errors.content._errors[0]"
            />
          </div>
          <div>
            <BasePrimaryButton type="submit">Simpan</BasePrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>
