import { defineStore } from "#imports";

interface Form {
  email: string;
  password: string;
}
interface Response {
  statusCode: number;
  message: string;
  data: ResponseAuth;
}
interface ResponseAuth {
  id: number;
  name: string;
  token: string;
  role: ResponseUserRole[];
}
interface ResponseUserRole {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
}

export const useAuthStore = defineStore("auth", () => {
  const isLogged: Ref<boolean> = ref(false);
  const userId: Ref<number | null> = ref(null);
  const name: Ref<string | null> = ref(null);
  const role: Ref<ResponseUserRole[] | []> = ref([]);
  const token: Ref<string | null> = ref(null);
  const useToken = useCookie<string | null>("token", {
    secure: true,
  });

  async function me(): Promise<void> {
    const { $api } = useNuxtApp();

    try {
      const result: Response = await $api("me", {
        method: "get",
      });

      userId.value = result.data.id;
      name.value = result.data.name;
      role.value = result.data.role;
      isLogged.value = true;
      token.value = useToken.value;
    } catch (error: any) {
      if (error.data) {
        console.log(error.data);
      }
    }
  }

  async function login(request: Form): Promise<void> {
    const { $api } = useNuxtApp();

    const result: Response = await $api("login", {
      method: "post",
      body: {
        email: request.email,
        password: request.password,
      },
    });

    userId.value = result.data.id;
    name.value = result.data.name;
    role.value = result.data.role;
    isLogged.value = true;
    token.value = result.data.token;
    useToken.value = result.data.token;
  }

  function logout(): void {
    isLogged.value = false;
    userId.value = null;
    name.value = null;
    role.value = [];
    token.value = null;
    useToken.value = null;
  }

  return {
    isLogged,
    userId,
    name,
    role,
    token,
    me,
    logout,
    login,
  };
});
