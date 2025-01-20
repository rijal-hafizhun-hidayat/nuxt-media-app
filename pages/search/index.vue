<script setup lang="ts">
definePageMeta({
  middleware: ["auth-middleware"],
});

interface Form {
  search: string;
}

const form: Form = reactive({
  search: "",
});

const send = () => {
  console.log(form);
};
</script>
<template>
  <NuxtLayout name="dashboard-layout">
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            search
          </h2>
        </div>
      </div>
    </template>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <form
          @submit.prevent="send()"
          class="grid grid-flow-col justify-stretch space-x-4"
        >
          <div>
            <BaseTextInput
              type="text"
              class="mt-1 block w-full"
              v-model="form.search"
              placeholder="cari pengguna"
              autofocus
            />
          </div>
          <div class="my-auto">
            <BasePrimaryButton type="submit">cari</BasePrimaryButton>
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>
