export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie<string | null>("token", {
    secure: true,
  });
  const useAuth = useAuthStore();

  const api = $fetch.create({
    baseURL: "http://localhost:8000/api",
    onRequest({ request, options, error }) {
      // if (token.value) {
      //   options.credentials = "include";
      // }
      if (token.value) {
        options.headers = options.headers || ({} as Record<string, string>);
        if (Array.isArray(options.headers)) {
          options.headers.push(["Authorization", `Bearer ${token.value}`]);
        } else if (options.headers instanceof Headers) {
          options.headers.set("Authorization", `Bearer ${token.value}`);
        } else {
          (options.headers as Record<string, string>)[
            "Authorization"
          ] = `Bearer ${token.value}`;
        }
      }
    },
    onResponse({ response }) {
      console.log(response);
    },
    async onResponseError({ response }) {
      console.log(response);
      if (response.status === 403) {
        token.value = null;
        useAuth.logout();
        await nuxtApp.runWithContext(() => navigateTo("/"));
      }
      if (response.status === 500) {
        token.value = null;
        useAuth.logout();
        await nuxtApp.runWithContext(() => navigateTo("/"));
      }
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
