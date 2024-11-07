export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $swal } = useNuxtApp();
  const useToken = useCookie("token", {
    secure: true,
  });
  const useAuth = useAuthStore();

  if (useToken.value && useAuth.isLogged === false) {
    await useAuth.me();
  }

  if (!useAuth.isRoleUser) {
    $swal.fire({
      title: "error",
      text: "unauthorized",
      icon: "error",
    });
    return navigateTo("/");
  }
});
