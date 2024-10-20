<script setup lang="ts">
interface Response {
  statusCode: number;
  message: string;
  data: NotificationResponse[];
}
interface FromUserResponse {
  id: number;
  avatar: string | null;
  name: string;
}
interface NotificationResponse {
  id: number;
  from_user_id: number;
  message: string;
  to_user_id: number;
  is_read: boolean;
  type_notification: "POST" | "COMMENT";
  type_notification_id: number;
  created_date: Date;
  update_date: Date;
  from_user: FromUserResponse;
}
const notifications: Ref<Response> = ref({} as Response);
const { data } = await useCustomFetch<Response>("notification");
if (data.value) {
  notifications.value = data.value;
}
const clickNotification = (index: number) => {
  console.log(index);
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-2 rounded shadow-md overflow-x-auto">
      <div class="space-y-5">
        <div
          v-for="notification in notifications.data"
          :key="notification.id"
          @click="clickNotification(notification.id)"
          class="flex hover:bg-gray-200 active:bg-gray-300 rounded p-2 hover:cursor-pointer transition ease-in-out duration-150 flex-row space-x-4"
        >
          <div>
            <NuxtImg
              class="object-cover object-top w-20 sm:w-16 h-20 sm:h-16"
              :src="
                notification.from_user.avatar
                  ? notification.from_user.avatar
                  : 'img/falling-into-darkness.png'
              "
            />
          </div>
          <div class="my-auto">
            <p class="font-medium">
              <span class="font-bold">{{ notification.from_user.name }}</span>
              {{ notification.message }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
