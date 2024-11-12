<script setup lang="ts">
definePageMeta({
  middleware: ["auth-middleware"],
});

interface Form {
  content: string;
}
interface Result {
  statusCode: number;
  message: string;
  data: Post | PostFile;
}
interface PostFile {
  id: number;
  post_id: number;
  file: string;
  created_at: Date;
  updated_at: Date;
}
interface Post {
  id: number;
  user_id: number;
  content: string;
}
interface Validation {
  statusCode: number;
  errors: Record<string, string[]>;
}
interface FileUpload {
  file: File | string;
  name: String;
  size: number;
  type: String;
  fileExtention: String;
  url: String;
  isImage: Boolean;
  isUploaded: Boolean;
}

const router = useRouter();
const isLoading: Ref<boolean> = ref(false);
const { $api, $swal } = useNuxtApp();
const validation: Ref<Validation | null> = ref(null);
const file: Ref<File | null> = ref(null);
const form: Form = reactive({
  content: "",
});

const send = async () => {
  try {
    isLoading.value = true;
    const result: Result = await $api("post", {
      method: "post",
      body: {
        content: form.content,
      },
    });
    $swal.fire({
      title: "success",
      text: result.message,
      icon: "success",
    });

    if (file.value !== null) {
      await $api("post_file", {
        method: "post",
        body: {
          post_id: result.data.id,
        },
      });

      const formData: FormData = new FormData();
      formData.append("file", file.value);
      await $api(`storage/post_file/${result.data.id}/file`, {
        method: "patch",
        body: formData,
      });
    }
    router.push({
      name: "post",
    });
  } catch (error: any) {
    isLoading.value = false;
    if (error.data && error.data.statusCode === 404) {
      $swal.fire({
        title: "error",
        text: error.data.errors,
        icon: "error",
      });
    } else if (error.data && error.data.statusCode === 400) {
      validation.value = error.data;
    }
  } finally {
    isLoading.value = false;
  }
};

const getUploadData = (dataFile: FileUpload) => {
  if (dataFile.size > 0) {
    file.value = dataFile.file as File;
  } else {
    file.value = null;
  }

  console.log(file.value);
};
</script>
<template>
  <NuxtLayout name="dashboard-layout">
    <template #header>
      <div class="flex justify-between">
        <div>
          <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            Tambah Postingan
          </h2>
        </div>
      </div>
    </template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
        <form @submit.prevent="send()" class="space-y-4">
          <div>
            <BaseInputLabel>Masukkan Isi Postingan</BaseInputLabel>
            <BaseTextAreaInput
              rows="8"
              v-model="form.content"
              class="block mt-1 w-full"
            />
            <BaseInputError
              v-if="
                validation &&
                validation.statusCode === 400 &&
                validation.errors.content
              "
              :message="validation.errors.content[0]"
            />
          </div>
          <div>
            <BaseInputLabel>Upload File</BaseInputLabel>
            <BaseFileUpload
              :maxSize="2"
              :accept="'mp4,mkv'"
              class="block mt-1 w-full"
              @file-upload="getUploadData"
            />
          </div>
          <div>
            <BasePrimaryButton
              :disabled="isLoading == true"
              :class="{ 'opacity-75': isLoading == true }"
              type="submit"
              >Simpan</BasePrimaryButton
            >
          </div>
        </form>
      </div>
    </div>
  </NuxtLayout>
</template>
