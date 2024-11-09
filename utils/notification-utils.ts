type TypeNotification = "LIKE" | "COMMENT";

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
  type_notification: TypeNotification;
  created_at: Date;
  updated_at: Date;
}
export class NotificationUtils {
  static async storeNotification(
    toUserId: number,
    typeNotification: TypeNotification
  ): Promise<Result> {
    const { $api } = useNuxtApp();

    const result: Result = await $api("notification", {
      method: "post",
      body: {
        to_user_id: toUserId,
        type_notification: typeNotification,
      },
    });

    return result;
  }
}
