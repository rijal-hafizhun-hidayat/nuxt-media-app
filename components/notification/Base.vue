<script setup lang="ts">
const clickNotification = (index: number) => {
  console.log(index);
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-2 rounded shadow-md overflow-x-auto">
      <div class="space-y-5">
        <div
          v-for="index in 5"
          :key="index"
          @click="clickNotification(index)"
          class="flex hover:bg-gray-200 rounded p-2 hover:cursor-pointer transition ease-in-out duration-150 flex-row space-x-4"
        >
          <div>
            <NuxtImg
              class="object-cover object-top w-20 sm:w-16 h-20 sm:h-16"
              :src="'img/falling-into-darkness.png'"
            />
          </div>
          <div class="my-auto">
            <p class="font-medium">
              <span class="font-bold">faris maulana</span> mengomentari
              postinganmu
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
