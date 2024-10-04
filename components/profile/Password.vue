<script setup lang="ts">
interface Form {
  password: string;
}
const form: Form = reactive({
  password: "",
});

const update = async () => {
  console.log(form);
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
      <h1 class="font-bold mb-4">Update Password</h1>
      <div class="whitespace-nowrap">
        <form @submit.prevent="update()" class="space-y-4">
          <div>
            <BaseInputLabel>masukkan password baru</BaseInputLabel>
            <BaseTextInput
              v-model="form.password"
              type="text"
              class="mt-1 block w-full"
            />
          </div>
          <div>
            <BasePrimaryButton type="submit">Simpan</BasePrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
