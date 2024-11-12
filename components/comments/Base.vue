<script setup lang="ts">
interface Form {
  comment: "";
}
interface Response {
  statusCode: number;
  message: string;
  data: PostComment[] | PostComment;
}
interface PostComment {
  comment: string;
  id: number;
  created_at: Date;
  updated_at: Date;
  user_id: number;
  post_id: number;
  user: PostCommentUser;
}
interface PostCommentUser {
  name: string;
  avatar: string | null;
}

const props = defineProps<{
  postId: number;
  postUserId: number;
}>();

const { $api } = useNuxtApp();
const isLoading: Ref<boolean> = ref(false);
const postComments: Ref<PostComment[] | null> = ref(null);
const form: Form = reactive({
  comment: "",
});

const { data, error, refresh } = await useCustomFetch<Response>(
  `post/${props.postId}/comment`
);
if (data.value) {
  postComments.value = data.value.data as PostComment[];
  console.log(postComments.value);
}
if (error.value) {
  console.log(error.value);
}
const sendComment = async () => {
  try {
    isLoading.value = true;
    const result: Response = await $api(`post/${props.postId}/comment`, {
      method: "post",
      body: {
        comment: form.comment,
      },
    });
    console.log(result);
  } catch (error: any) {
    isLoading.value = false;
    console.log(error.data);
  } finally {
    await refresh();
    if (data.value) {
      postComments.value = data.value.data as PostComment[];
    }
    form.comment = "";
    isLoading.value = false;
  }

  try {
    await NotificationUtils.storeNotification(
      props.postUserId,
      "mengomentari postinganmu",
      2,
      `/post/${props.postId}`
    );
  } catch (error: any) {
    console.log(error.data);
  }
};
</script>
<template>
  <div class="border-t">
    <div
      v-if="postComments && postComments.length > 0"
      class="overflow-y-auto max-h-60 sm:max-h-96"
    >
      <div
        v-for="postComment in postComments"
        :key="postComment.id"
        class="flex justify-start mt-3 space-x-4"
      >
        <div>
          <NuxtImg
            class="object-cover object-top w-10 sm:w-10 h-10 sm:h-10"
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
