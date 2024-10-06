export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie<string>("token");

  const api = $fetch.create({
    baseURL: "http://localhost:8000/api",
    onRequest({ request, options, error }) {
      if (token.value) {
        const headers = options.headers || {};
        if (Array.isArray(headers)) {
          headers.push(["Authorization", `Bearer ${token.value}`]);
        } else if (headers instanceof Headers) {
          headers.set("Authorization", `Bearer ${token.value}`);
        } else {
          headers.Authorization = `Bearer ${token.value}`;
        }
      }
    },
    onResponse({ response }) {
      console.log(response);
    },
    onResponseError({ response }) {
      if (response.status === 403) {
        nuxtApp.runWithContext(() => navigateTo("/"));
      }
      console.log(response);
    },
  });

  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  };
});
