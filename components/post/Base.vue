<script setup lang="ts">
const props = defineProps<{
  is_profile: Boolean;
}>();
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
  is_liked: boolean;
}
interface UserPostResponse {
  id: number;
  name: string;
}
const posts: Ref<Response> = ref({} as Response);
const apiRoute: Ref<string> = ref("");

if (props.is_profile === true) {
  apiRoute.value = "profile/post";
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
            <p class="font-bold capitalize">{{ post.user.name }}</p>
          </div>
          <div>
            <p class="text-green-500 font-bold">online</p>
          </div>
        </div>
        <div>
          <p>{{ post.content }}</p>
        </div>
        <div>
          <PostFooter :postId="post.id" :isLiked="post.is_liked" />
        </div>
      </div>
    </div>
  </div>
</template>
