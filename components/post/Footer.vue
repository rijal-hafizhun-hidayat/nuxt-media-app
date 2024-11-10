<script setup lang="ts">
type ApiMethod = "delete" | "post";

const props = defineProps<{
  postId: number;
  isLikedUser: boolean;
  postLikeCount: number;
  postCommentCount: number;
  postUserId: number;
}>();

const isDisable: Ref<boolean> = ref(false);
const apiRoute: Ref<string> = ref("");
const apiMethod: Ref<ApiMethod> = ref("post");
const showComment: Ref<boolean> = ref(false);
const likeCount: Ref<number> = ref(props.postLikeCount);
const commentCount: Ref<number> = ref(props.postCommentCount);
const isLike: Ref<boolean> = ref(props.isLikedUser);
const { $api } = useNuxtApp();

const toggleComment = () => {
  showComment.value = !showComment.value;
  console.log(showComment.value);
};
const likePost = async () => {
  isLike.value = !isLike.value; // toggle isLike state
  apiRoute.value = isLike.value
    ? `post/${props.postId}/like`
    : `post/${props.postId}/unlike`;
  apiMethod.value = isLike.value ? "post" : "delete"; // switch between post and delete

  try {
    isDisable.value = true;
    const result = await $api(apiRoute.value, {
      method: apiMethod.value,
    });
    console.log(result);
    apiMethod.value == "post" ? likeCount.value++ : likeCount.value--;
  } catch (error: any) {
    console.log(error.data);
  } finally {
    isDisable.value = false;
  }

  if (apiMethod.value === "post") {
    try {
      await NotificationUtils.storeNotification(
        props.postUserId,
        "menyukai postinganmu",
        1,
        `/post/${props.postId}`
      );
    } catch (error: any) {
      console.log(error.data);
    }
  }
};
</script>
<template>
  <div>
    <p class="font-light">{{ likeCount }} likes, {{ commentCount }} comments</p>
  </div>
  <div class="flex justify-around border-t">
    <button
      :disabled="isDisable"
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
    </button>
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
  <CommentsBase
    v-if="showComment === true"
    :postId="props.postId"
    :postUserId="props.postUserId"
  />
</template>
