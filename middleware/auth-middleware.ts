export default defineNuxtRouteMiddleware(async (to, from) => {
  const useToken = useCookie("token", {
    secure: true,
  });
  const useAuth = useAuthStore();

  if (useToken.value && useAuth.isLogged === false) {
    await useAuth.me();
  }
});
