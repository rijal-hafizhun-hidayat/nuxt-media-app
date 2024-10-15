<script setup lang="ts">
const props = defineProps<{
  postId: number;
  isLiked: boolean;
}>();
type ApiMethod = "delete" | "post";

const apiRoute: Ref<string> = ref("");
const apiMethod: Ref<ApiMethod> = ref("post");
const showComment: Ref<boolean> = ref(false);
const isLike: Ref<boolean> = ref(props.isLiked);
const { $api } = useNuxtApp();

const toggleComment = () => {
  showComment.value = !showComment.value;
};

const likePost = async () => {
  isLike.value = !isLike.value; // toggle isLike state
  apiRoute.value = isLike.value
    ? `post/${props.postId}/like`
    : `post/${props.postId}/unlike`;
  apiMethod.value = isLike.value ? "post" : "delete"; // switch between post and delete

  try {
    const result = await $api(apiRoute.value, {
      method: apiMethod.value,
    });
    console.log(result);
  } catch (error: any) {
    console.log(error.data);
  }
};
</script>
<template>
  <div class="flex justify-around border-t">
    <div
      @click="likePost()"
      class="w-full mt-2 py-2 cursor-pointer transition ease-in-out duration-150 hover:bg-gray-300 hover:rounded"
    >
      <div class="text-center space-x-2">
        <span>
          <font-awesome
            :class="{ 'text-cyan-500': isLike }"
            icon="fa-thumbs-up"
          />
        </span>
        <span class="font-medium">Suka</span>
      </div>
    </div>
    <div
      @click="toggleComment()"
      class="w-full mt-2 py-2 cursor-pointer transition ease-in-out duration-150 hover:bg-gray-300 hover:rounded"
    >
      <div class="text-center space-x-2">
        <span>
          <font-awesome icon="fa-comment" />
        </span>
        <span class="font-medium">Komentar</span>
      </div>
    </div>
    <div
      class="w-full mt-2 py-2 cursor-pointer transition ease-in-out duration-150 hover:bg-gray-300 hover:rounded"
    >
      <div class="text-center space-x-2">
        <span>
          <font-awesome icon="fa-share" />
        </span>
        <span class="font-medium">Share</span>
      </div>
    </div>
  </div>
  <div class="border-t" v-if="showComment === true">
    <PostComments />
  </div>
</template>
