export default defineNuxtPlugin(async (nuxtApp) => {
  const Swal = await import("sweetalert2").then((m) => m.default);
  nuxtApp.provide("swal", Swal);
});
