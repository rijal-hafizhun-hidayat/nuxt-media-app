<script setup lang="ts">
interface Form {
  comment: string;
}
interface Response {
  statusCode: number;
  message: string;
  data: PostCommentResponse[];
}
interface ResponseSuccessComment {
  statusCode: number;
  message: string;
  data: ResponseSuccessDataComment;
}
interface ResponseSuccessDataComment {
  comment: string;
  created_at: Date;
  id: number;
  post_id: number;
  updated_at: string;
  user_id: number;
}
interface PostCommentResponse {
  comment: string;
  id: number;
  created_at: Date;
  updated_at: Date;
  user: PostCommentUserResponse;
}
interface PostCommentUserResponse {
  name: string;
  avatar: string | null;
}
const props = defineProps<{
  postId: number;
  isLikedUser: boolean;
  postLikeCount: number;
  postCommentCount: number;
  postUserId: number;
}>();
//console.log(props.postCommentCount);
type ApiMethod = "delete" | "post";

const resultCommentId: Ref<number | string> = ref("");
const isDisable: Ref<boolean> = ref(false);
const apiRoute: Ref<string> = ref("");
const apiMethod: Ref<ApiMethod> = ref("post");
const showComment: Ref<boolean> = ref(false);
const likeCount: Ref<number> = ref(props.postLikeCount);
const commentCount: Ref<number> = ref(props.postCommentCount);
const isLike: Ref<boolean> = ref(props.isLikedUser);
const shouldRefresh: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);
const form: Form = reactive({
  comment: "",
});
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
      await NotificationUtils.storeNotification(props.postUserId, "LIKE");
    } catch (error: any) {
      console.log(error.data);
    }
  }
};
const {
  data: postComments,
  error,
  refresh,
} = await useCustomFetch<Response>(`post/${props.postId}/comment`, {
  watch: [shouldRefresh],
});
if (error.value) {
  console.log(error.value);
}
const sendComment = async () => {
  try {
    isLoading.value = true;
    const resultSendComment: ResponseSuccessComment = await $api(
      `post/${props.postId}/comment`,
      {
        method: "post",
        body: {
          comment: form.comment,
        },
      }
    );
    resultCommentId.value = resultSendComment.data.id;
  } catch (error: any) {
    isLoading.value = false;
    console.log(error.data);
  } finally {
    shouldRefresh.value = shouldRefresh.value === true ? false : true;
    isLoading.value = false;
    form.comment = "";
    commentCount.value++;
  }

  try {
    await NotificationUtils.storeNotification(props.postUserId, "COMMENT");
  } catch (error: any) {
    console.log(error.data);
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
  <div class="border-t" v-if="showComment === true">
    <div class="overflow-y-auto max-h-60 sm:max-h-96">
      <div
        v-for="postComment in postComments!.data"
        :key="postComment.id"
        class="flex justify-start mt-3 space-x-4"
      >
        <div>
          <NuxtImg
            class="object-cover object-top w-56 sm:w-10 h-10 sm:h-10"
            :src="postComment.user.avatar ?? 'img/falling-into-darkness.png'"
          />
        </div>
        <div class="grid grid-rows-1 gap-1 max-w-3xl overflow-x-auto">
          <div class="bg-gray-500 p-2 rounded-md">
            <div>
              <p class="font-bold capitalize text-white">
                {{ postComment.user.name }}
              </p>
            </div>
            <div>
              <p class="text-white">
                {{ postComment.comment }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- <div ref="bottomEl"></div> -->
    </div>
    <div class="py-4">
      <form @submit.prevent="sendComment()">
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
            <BasePrimaryButton
              :disabled="isLoading == true"
              :class="{ 'opacity-75': isLoading == true }"
              type="submit"
              >Kirim</BasePrimaryButton
            >
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
