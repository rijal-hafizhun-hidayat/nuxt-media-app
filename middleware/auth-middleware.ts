export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");
  const store = useAuthStore();

  console.log(store.auth);
  if (token.value) {
    store.isLogged = true;
  } else {
    return navigateTo("/");
  }
});
