<script setup lang="ts">
interface Response {
  statusCode: number;
  message: string;
  data: NotificationResponse[];
}
interface ResponseSuccessNotification {
  statusCode: number;
  message: string;
  data: ResponseSuccessDataNotification;
}
interface ResponseSuccessDataNotification {
  created_at: Date;
  from_user_id: number;
  id: number;
  is_read: boolean;
  message: string;
  to_user_id: number;
  type_notification: "COMMENT" | "LIKE";
  type_notification_id: number;
  updated_at: Date;
}
interface FromUserResponse {
  id: number;
  avatar: string | null;
  name: string;
}
type TypeNotification = "LIKE" | "COMMENT";
interface NotificationResponse {
  id: number;
  from_user_id: number;
  message: string;
  to_user_id: number;
  is_read: boolean;
  type_notification: TypeNotification;
  type_notification_id: number;
  created_date: Date;
  update_date: Date;
  from_user: FromUserResponse;
}
const router = useRouter();
const { $api } = useNuxtApp();
const notifications: Ref<Response | null> = ref(null);
const { data } = await useCustomFetch<Response>("notification");
if (data.value) {
  notifications.value = data.value;
  console.log(notifications.value);
}
const updateNotificationIsRead = async (
  notificationId: number,
  typeNotification: TypeNotification,
  notificationIsRead: boolean
) => {
  try {
    if (notificationIsRead === false) {
      const result: ResponseSuccessNotification = await $api(
        `notification/${notificationId}/is_read`,
        {
          method: "patch",
        }
      );
      console.log(result);
    }
    return router.push({
      name: "notification-id",
      params: {
        id: notificationId,
      },
      query: {
        type_notification: typeNotification,
      },
    });
  } catch (error: any) {
    console.log(error);
  }
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-5 rounded shadow-md overflow-x-auto">
      <div
        v-if="notifications && notifications.data.length > 0"
        class="space-y-5"
      >
        <div
          v-for="notification in notifications.data"
          :key="notification.id"
          @click="
            updateNotificationIsRead(
              notification.id,
              notification.type_notification,
              notification.is_read
            )
          "
          class="flex justify-start hover:bg-gray-200 active:bg-gray-300 rounded p-2 hover:cursor-pointer transition ease-in-out duration-150 space-x-4"
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
          <div v-if="notification.is_read === false" class="my-auto">
            <p class="text-red-500 font-bold">NEW</p>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center">No Notification</p>
      </div>
    </div>
  </div>
</template>
