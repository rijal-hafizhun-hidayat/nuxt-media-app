<script setup lang="ts">
const props = defineProps<{
  isMyProfile: Boolean;
  userId?: number;
}>();
console.log(props);
interface Response {
  statusCode: number;
  message: string;
  data: PostResponse[];
}
interface PostResponse {
  id: number;
  user_id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
  user: UserPostResponse;
  is_liked_user: boolean;
  post_like_count: number;
  post_comment_count: number;
}
interface UserPostResponse {
  id: number;
  name: string;
}
const authStore = useAuthStore();
const router = useRouter();
const posts: Ref<Response> = ref({} as Response);
const apiRoute: Ref<string> = ref("");

if (props.isMyProfile === true) {
  apiRoute.value = "profile/post";
} else if (props.userId) {
  apiRoute.value = `profile/${props.userId}/post`;
} else {
  apiRoute.value = "post";
}

const { data, error } = await useCustomFetch<Response>(apiRoute.value);

if (data.value) {
  posts.value = data.value;
  console.log(posts.value);
} else if (error) {
  console.log(error);
}

const toProfile = (userId: number) => {
  const routePage: any = {};
  if (authStore.userId === userId) {
    routePage.name = "profile";
  } else {
    routePage.name = "profile-id";
    routePage.params = {};
    routePage.params.id = userId;
  }
  return router.push(routePage);
};
</script>
<template>
  <div
    v-for="post in posts.data"
    :key="post.id"
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  >
    <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
      <div class="space-y-4">
        <div class="flex space-x-4">
          <div>
            <p
              @click="toProfile(post.user_id)"
              class="cursor-pointer font-bold capitalize"
            >
              {{ post.user.name }}
            </p>
          </div>
          <div>
            <p class="text-green-500 font-bold">online</p>
          </div>
        </div>
        <div>
          <p>{{ post.content }}</p>
        </div>
        <PostFooter
          :postId="post.id"
          :isLikedUser="post.is_liked_user"
          :postLikeCount="post.post_like_count"
          :postCommentCount="post.post_comment_count"
          :userId="post.user_id"
        />
      </div>
    </div>
  </div>
</template>
