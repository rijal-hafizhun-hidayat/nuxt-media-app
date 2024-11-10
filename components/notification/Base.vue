<script setup lang="ts">
interface Response {
  statusCode: number;
  message: string;
  data: Notification[];
}
interface FromUserResponse {
  id: number;
  avatar: string | null;
  name: string;
}
interface Notification {
  id: number;
  from_user_id: number;
  message: string;
  content_reference: string;
  to_user_id: number;
  is_read: boolean;
  notification_type_id: number;
  created_date: Date;
  update_date: Date;
  from_user: FromUserResponse;
}
const router = useRouter();
const { $api } = useNuxtApp();
const notifications: Ref<Notification[] | null> = ref(null);
const { data } = await useCustomFetch<Response>("notification");
if (data.value) {
  notifications.value = data.value.data;
  console.log(notifications.value);
}
const updateNotificationIsRead = async (
  notificationId: number,
  notificationIsRead: boolean,
  contentReference: string
) => {
  try {
    if (notificationIsRead === false) {
      const result: Response = await $api(
        `notification/${notificationId}/is_read`,
        {
          method: "patch",
        }
      );
      console.log(result);
    }
    return router.push({
      path: `${contentReference}`,
    });
  } catch (error: any) {
    console.log(error);
  }
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-5 rounded shadow-md overflow-x-auto">
      <div v-if="notifications && notifications.length > 0" class="space-y-5">
        <div
          v-for="notification in notifications"
          :key="notification.id"
          @click="
            updateNotificationIsRead(
              notification.id,
              notification.is_read,
              notification.content_reference
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
