<script setup lang="ts">
interface Response {
  statusCode: number;
  message: string;
  data: Navbar;
}
interface Navbar {
  notification_count: number;
}

const showingNavigationDropdown = ref(false);
const router = useRouter();
const useAuth = useAuthStore();
const navbar: Ref<Navbar | null> = ref(null);

const { data, error } = await useCustomFetch<Response>("navbar");
if (data.value) {
  navbar.value = data.value.data;
  console.log(navbar.value);
} else if (error.value) {
  console.log(error.value);
}

const logout = () => {
  useAuth.logout();
  return router.push({
    name: "index",
  });
};

const myProfile = () => {
  return router.push({
    name: "profile",
  });
};
</script>
<template>
  <div>
    <div class="min-h-screen bg-gray-100">
      <div class="sticky top-0 z-10">
        <nav class="bg-white border-b border-gray-100">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
              <div class="flex">
                <div class="flex items-center">
                  <DashboardApplicationLogo
                    class="block fill-current text-gray-800"
                  />
                </div>
                <div class="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                  <NuxtLink
                    active-class="border-indigo-700"
                    inactive-class="border-indigo-500"
                    class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                    to="/post"
                  >
                    Beranda
                  </NuxtLink>
                  <NuxtLink
                    active-class="border-indigo-700"
                    inactive-class="border-indigo-500"
                    class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                    to="/notification"
                  >
                    <div class="space-x-1">
                      <span>Notifikasi</span>
                      <span
                        v-if="navbar && navbar.notification_count > 0"
                        class="bg-red-500 px-1 py-0 rounded text-white"
                        >{{ navbar.notification_count }}</span
                      >
                    </div>
                  </NuxtLink>
                  <NuxtLink
                    active-class="border-indigo-700"
                    inactive-class="border-indigo-500"
                    class="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                    to="/search"
                  >
                    Cari
                  </NuxtLink>
                </div>
              </div>

              <div class="hidden sm:flex sm:items-center sm:ml-6">
                <div class="ml-3 relative">
                  <DashboardDropdown align="right" width="48">
                    <template #trigger>
                      <span class="inline-flex rounded-md">
                        <button
                          type="button"
                          class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                        >
                          {{ useAuth.name }}

                          <svg
                            class="ml-2 -mr-0.5 h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </button>
                      </span>
                    </template>
                    <template #content>
                      <a
                        @click="myProfile()"
                        class="cursor-pointer block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                      >
                        Profile
                      </a>
                      <a
                        @click="logout()"
                        class="cursor-pointer block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
                      >
                        Logout
                      </a>
                    </template>
                  </DashboardDropdown>
                </div>
              </div>

              <div class="-mr-2 flex items-center sm:hidden">
                <button
                  @click="
                    showingNavigationDropdown = !showingNavigationDropdown
                  "
                  class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                >
                  <svg
                    class="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      :class="{
                        hidden: showingNavigationDropdown,
                        'inline-flex': !showingNavigationDropdown,
                      }"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                    <path
                      :class="{
                        hidden: !showingNavigationDropdown,
                        'inline-flex': showingNavigationDropdown,
                      }"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            :class="{
              block: showingNavigationDropdown,
              hidden: !showingNavigationDropdown,
            }"
            class="sm:hidden"
          >
            <div class="pt-2 pb-3 space-y-1">
              <NuxtLink
                to="/dashboard"
                activeClass="border-indigo-500"
                exactActiveClass="border-indigo-900"
                class="block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
                >Beranda</NuxtLink
              >
              <NuxtLink
                to="/notification"
                activeClass="border-indigo-500"
                exactActiveClass="border-indigo-900"
                class="block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
                ><div class="space-x-1">
                  <span>Notifikasi</span>
                  <span
                    v-if="navbar && navbar.notification_count > 0"
                    class="bg-red-500 px-1 py-0 rounded text-white"
                    >{{ navbar.notification_count }}</span
                  >
                </div></NuxtLink
              >
              <NuxtLink
                to="/search"
                activeClass="border-indigo-500"
                exactActiveClass="border-indigo-900"
                class="block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
                >Cari</NuxtLink
              >
            </div>

            <!-- Responsive Settings Options -->
            <div class="pt-4 pb-1 border-t border-gray-200">
              <div class="px-4">
                <div class="font-medium text-base text-gray-800">
                  {{ useAuth.name }}
                </div>
                <div class="font-medium text-sm text-gray-500">
                  {{ useAuth.name }}
                </div>
              </div>

              <div class="mt-3 space-y-1">
                <a
                  @click="myProfile()"
                  class="cursor-pointer block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
                  >Profile</a
                >
                <a
                  @click="logout()"
                  class="cursor-pointer block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out"
                  >Logout</a
                >
              </div>
            </div>
          </div>
        </nav>

        <header class="bg-white shadow">
          <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <slot name="header" />
          </div>
        </header>
      </div>

      <main class="py-5">
        <slot />
      </main>
    </div>
  </div>
</template>
