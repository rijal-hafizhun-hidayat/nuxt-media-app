<script setup lang="ts">
definePageMeta({
  middleware: ["auth-middleware"],
});

interface Result {
  statusCode: number;
  message: string;
  data: Post;
}
interface Post {
  content: string;
  created_at: Date;
  id: number;
  is_liked_user: boolean;
  post_comment_count: number;
  post_like_count: number;
  updated_at: Date;
  user_id: number;
  user: User;
}
interface User {
  id: number;
  name: string;
}

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const post: Ref<Post | null> = ref(null);
const { data } = await useCustomFetch<Result>(`post/${route.params.id}`);
if (data.value) {
  post.value = data.value.data;
  console.log(post.value);
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
  <NuxtLayout name="dashboard-layout">
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Post
          </h2>
        </div>
      </div>
    </template>

    <div v-if="post" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            :isShowComment="
              route.query.notification_type === 'comment' ? true : false
            "
            :postId="post.id"
            :isLikedUser="post.is_liked_user"
            :postLikeCount="post.post_like_count"
            :postCommentCount="post.post_comment_count"
            :postUserId="post.user_id"
          />
        </div>
      </div>
    </div>
    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <p>post not found</p>
      </div>
    </div>
  </NuxtLayout>
</template>
