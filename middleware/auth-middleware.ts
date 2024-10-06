export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");
  const store = useAuthStore();

  if (token.value) {
    store.isLogged = true;
  } else {
    return navigateTo("/");
  }
});
