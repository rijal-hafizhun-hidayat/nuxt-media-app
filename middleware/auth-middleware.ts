export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie("token");
  const store = useAuthStore();

  // const auth = store.auth;
  //await store.me();
  if (store.auth.length === 0) {
    await store.me();
  }
  // console.log(store.auth);
  // console.log(store.auth.length);
  if (token.value) {
    store.isLogged = true;
  } else {
    return navigateTo("/");
  }
});
