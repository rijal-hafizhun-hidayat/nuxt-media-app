<script setup lang="ts">
interface Response {
  statusCode: number;
  message: string;
  data: Profile | UserFollow;
}
interface Profile {
  avatar: string;
  bio: string;
  email: string;
  id: number;
  name: string;
  followed_user_count: number;
  followed_users: UserFollow[];
}
interface UserFollow {
  id: number;
  follower_user_id: number;
  followed_user_id: number;
  followed_at: Date;
}

const props = defineProps<{
  isMyProfile: boolean;
  userId?: number;
}>();

const apiRoute: Ref<string> = ref(
  props.isMyProfile ? "profile" : `profile/${props.userId}`
);
const router = useRouter();
const response: Ref<Profile | null> = ref(null);
const isFollowed: Ref<boolean> = ref(false);
const { $api, $swal } = useNuxtApp();

const { data, error } = await useCustomFetch<Response>(apiRoute.value);

if (data.value) {
  console.log(data.value);
  response.value = data.value.data as Profile;
  if (!props.isMyProfile && response.value.followed_users.length > 0) {
    isFollowed.value = true;
  }
} else if (error.value) {
  console.log(error.value);
}

const plainTextFollowed = computed(() => {
  return isFollowed.value ? "already followed" : "follow";
});

const updateProfile = () => {
  return router.push({
    name: "profile-update",
  });
};

const followUser = async (userId: number) => {
  try {
    const result: Response = await $api<Response>("user_follow", {
      method: "post",
      body: {
        followed_user_id: userId,
      },
    });

    $swal.fire({
      title: "success",
      text: result.message,
      icon: "success",
    });

    isFollowed.value = true;
  } catch (error: any) {
    if (error.data.statusCode === 404) {
      $swal.fire({
        title: "error",
        text: error.data.errors,
        icon: "error",
      });
    }
    console.log(error.data);
  }
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div
      v-if="response"
      class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto"
    >
      <div class="flex justify-center">
        <div class="grid justify-items-center space-y-4">
          <div>
            <NuxtImg
              class="object-cover object-top w-28 sm:w-40 h-28 sm:h-40"
              :src="response.avatar ?? 'img/falling-into-darkness.png'"
            />
          </div>
          <div>
            <p class="font-bold text-lg">{{ response.name }}</p>
          </div>
          <div>
            <p class="italic">{{ response.bio }}</p>
          </div>
          <div class="flex justify-center space-x-2">
            <div v-if="!props.isMyProfile">
              <BasePrimaryButton
                @click="followUser(response?.id as number)"
                :disabled="isFollowed"
                type="button"
                >{{ plainTextFollowed }}</BasePrimaryButton
              >
            </div>

            <div v-if="props.isMyProfile">
              <BasePrimaryButton @click="updateProfile()" type="button"
                >edit profile</BasePrimaryButton
              >
            </div>
            <div>
              <BasePrimaryButton type="button" disabled
                >{{ response.followed_user_count }} follow</BasePrimaryButton
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto"
    >
      <p>no data found</p>
    </div>
  </div>
</template>
