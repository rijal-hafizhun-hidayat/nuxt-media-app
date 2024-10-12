<script setup lang="ts">
const props = defineProps<{
  is_profile: Boolean;
}>();
const posts: Ref<any> = ref([]);
const apiRoute: Ref<string> = ref("");

if (props.is_profile === true) {
  apiRoute.value = "profile/post";
} else {
  apiRoute.value = "post";
}
const { data, error } = await useCustomFetch<[]>(apiRoute.value);

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
          <PostFooter />
        </div>
      </div>
    </div>
  </div>
</template>
