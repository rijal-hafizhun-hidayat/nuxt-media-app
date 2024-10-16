<script setup lang="ts">
interface Form {
  comment: string;
}
const form: Form = reactive({
  comment: "",
});
const send = () => {
  console.log(form);
};
</script>
<template>
  <div class="overflow-y-auto max-h-60 sm:max-h-96">
    <div
      v-for="index in 5"
      :key="index"
      class="flex justify-start mt-3 space-x-4"
    >
      <div>
        <NuxtImg
          class="object-cover object-top w-56 sm:w-10 h-10 sm:h-10"
          :src="'img/falling-into-darkness.jpg'"
        />
      </div>
      <div class="grid grid-rows-1 gap-1 max-w-3xl overflow-x-auto">
        <div class="bg-gray-500 p-2 rounded-md">
          <div>
            <p class="font-bold capitalize text-white">
              rijal hafizhun hidayat
            </p>
          </div>
          <div>
            <p class="text-white">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad odit
              repellat minus iure, eos quam ipsum praesentium quae, natus optio
              earum quo dolorem numquam ipsam, molestias quia quisquam aliquid
              laborum?
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="py-4">
    <form @submit.prevent="send()">
      <div class="flex flex-row my-auto space-x-5">
        <div class="w-full">
          <BaseTextInput
            class="mt-1 block w-full"
            type="text"
            v-model="form.comment"
            placeholder="write comment here"
          />
        </div>
        <div class="my-auto">
          <BasePrimaryButton type="submit">Kirim</BasePrimaryButton>
        </div>
      </div>
    </form>
  </div>
</template>
