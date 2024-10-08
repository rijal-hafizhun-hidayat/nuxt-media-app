<script setup>
const showComment = ref(false);
const isLike = ref(false);

const isShowComment = () => {
  if (showComment.value === false) {
    showComment.value = true;
  } else {
    showComment.value = false;
  }
  console.log(showComment.value);
};

const likePost = () => {
  if (isLike.value === false) {
    return (isLike.value = true);
  } else {
    return (isLike.value = false);
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
      @click="isShowComment()"
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
