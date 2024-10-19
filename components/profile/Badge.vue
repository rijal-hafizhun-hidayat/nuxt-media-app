<script setup lang="ts">
interface Response {
  statusCode: number;
  message: string;
  data: ResponseProfile | null;
}
interface ResponseProfile {
  avatar: string;
  bio: string;
  email: string;
  id: number;
  name: string;
}
const props = defineProps<{
  isMyProfile: boolean;
  userId?: number;
}>();
const apiRoute: Ref<string> = ref("");
const router = useRouter();
const response: Ref<Response> = ref({} as Response);

apiRoute.value = props.isMyProfile ? "profile" : `profile/${props.userId}`;
const { data, error } = await useCustomFetch<Response>(apiRoute.value);

if (data.value) {
  response.value = data.value;
  console.log(response.value);
} else if (error.value) {
  console.log(error.value);
}

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
              :src="response.data?.avatar ?? 'img/falling-into-darkness.png'"
            />
          </div>
          <div>
            <p class="font-bold text-lg">{{ response.data?.name }}</p>
          </div>
          <div>
            <p class="italic">{{ response.data?.bio }}</p>
          </div>
          <div>
            <BasePrimaryButton
              v-if="props.isMyProfile"
              @click="updateProfile()"
              type="button"
              >edit profile</BasePrimaryButton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
