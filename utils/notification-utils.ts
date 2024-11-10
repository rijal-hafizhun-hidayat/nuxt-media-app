interface Result {
  statusCode: number;
  message: string;
  data: Notification;
}
interface Notification {
  id: number;
  from_user_id: number;
  to_user_id: number;
  message: string;
  is_read: boolean;
  notification_type_id: number;
  created_at: Date;
  updated_at: Date;
}
export class NotificationUtils {
  static async storeNotification(
    toUserId: number,
    message: string,
    notificationTypeId: number,
    url: string
  ): Promise<Result> {
    const { $api } = useNuxtApp();

    const result: Result = await $api("notification", {
      method: "post",
      body: {
        to_user_id: toUserId,
        message: message,
        notification_type_id: notificationTypeId,
        content_reference: url,
      },
    });

    return result;
  }
}
