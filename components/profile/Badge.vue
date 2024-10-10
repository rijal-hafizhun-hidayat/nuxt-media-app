<script setup lang="ts">
const props = defineProps<{
  bio: string;
  name: string;
}>();
const router = useRouter();
console.log(props);

const updateProfile = () => {
  return router.push({
    name: "profile-update",
  });
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
      <div class="flex justify-center">
        <div class="grid justify-items-center space-y-4">
          <div>
            <NuxtImg
              class="object-cover object-top w-28 sm:w-40 h-28 sm:h-40"
              src="/img/falling-into-darkness.jpg"
            />
          </div>
          <div>
            <p class="font-bold text-lg">{{ props.name }}</p>
          </div>
          <div>
            <p class="italic">{{ props.bio }}</p>
          </div>
          <div>
            <BasePrimaryButton @click="updateProfile()" type="button"
              >edit profile</BasePrimaryButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
