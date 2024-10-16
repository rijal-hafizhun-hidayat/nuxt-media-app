<script setup lang="ts">
interface Form {
  comment: string;
}
interface Response {
  statusCode: number;
  message: string;
  data: PostCommentResponse[];
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
}>();
const { $api } = useNuxtApp();
const shouldRefresh: Ref<boolean> = ref(false);
const isLoading: Ref<boolean> = ref(false);
const form: Form = reactive({
  comment: "",
});
const {
  data: postComments,
  error,
  refresh,
} = await useCustomFetch<Response>(`post/${props.postId}/comment`, {
  watch: [shouldRefresh],
});
console.log(postComments);
if (error.value) {
  console.log(error.value);
}
const send = async () => {
  try {
    isLoading.value = true;
    const result = await $api(`post/${props.postId}/comment`, {
      method: "post",
      body: {
        comment: form.comment,
      },
    });

    shouldRefresh.value = true;
    // await refresh();
    console.log(result);
  } catch (error: any) {
    isLoading.value = false;
    console.log(error.data);
  } finally {
    shouldRefresh.value = false;
    isLoading.value = false;
  }
};
</script>
<template>
  <div class="overflow-y-auto max-h-60 sm:max-h-96">
    <div
      v-for="postComment in postComments!.data"
      :key="postComment.id"
      class="flex justify-start mt-3 space-x-4"
    >
      <div>
        <NuxtImg
          class="object-cover object-top w-56 sm:w-10 h-10 sm:h-10"
          :src="postComment.user.avatar ?? 'img/falling-into-darkness.jpg'"
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
  </div>
  <div class="py-4">
    <form @submit.prevent="send()">
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
</template>
