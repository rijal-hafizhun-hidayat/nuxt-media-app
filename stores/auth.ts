import { defineStore } from "#imports";

export const useAuthStore = defineStore("auth", () => {
  const isLogged: Ref<boolean> = ref(false);
  const auth: Ref<any> = ref([]);

  async function me() {
    const { $api } = useNuxtApp();

    try {
      const response = await $api("me", {
        method: "get",
      });

      isLogged.value = true;
      auth.value = response;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    isLogged,
    auth,
    me,
  };
});
