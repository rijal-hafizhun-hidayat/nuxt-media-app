<script setup lang="ts">
interface Form {
  content: string;
}
const form: Form = reactive({
  content: "",
});
const send = () => {
  console.log(form);
};
</script>
<template>
  <NuxtLayout name="dashboard-layout">
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
          </div>
          <div>
            <BasePrimaryButton type="submit">Simpan</BasePrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>
