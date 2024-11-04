export default defineNuxtRouteMiddleware(async (to, from) => {
  const useToken = useCookie("token");
  const useAuth = useAuthStore();

  if (useToken.value && useAuth.isLogged === false) {
    await useAuth.me();
  }
});
