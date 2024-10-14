// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "@vesp/nuxt-fontawesome", "@nuxt/image"],
  alias: {
    pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs",
  },
  fontawesome: {
    icons: {
      solid: [
        "cog",
        "fa-xmark",
        "fa-image",
        "fa-plus",
        "fa-chevron-right",
        "fa-chevron-left",
        "fa-thumbs-up",
        "fa-comment",
        "fa-share",
      ],
    },
  },
});