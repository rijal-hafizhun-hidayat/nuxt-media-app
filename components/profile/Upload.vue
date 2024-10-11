<script setup lang="ts">
interface FileUpload {
  file: File | string;
  name: String;
  size: Number;
  type: String;
  fileExtention: String;
  url: String;
  isImage: Boolean;
  isUploaded: Boolean;
}
const fileUpload: Ref<File | String> = ref("");
const validation: Ref<any> = ref([]);
const { $api } = useNuxtApp();

const upload = async () => {
  const formData = new FormData();
  formData.append("file", fileUpload.value as File);

  try {
    const result = await $api("profile/update-avatar", {
      method: "patch",
      body: formData,
    });

    validation.value = result;
    console.log(validation.value);
  } catch (error: unknown) {
    console.log(error);
  }
};

const getUploadData = (dataFile: FileUpload) => {
  fileUpload.value = dataFile.file as File;
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
      <h1 class="font-bold mb-4">Update Avatar</h1>
      <BaseSuccessAlert
        v-if="validation.statusCode === 200"
        :message="validation.message"
      />
      <form @submit.prevent="upload()" class="space-y-4">
        <div>
          <BaseInputLabel>Upload Foto</BaseInputLabel>
          <!-- satuan maxSize menggunakan mb -->
          <BaseFileUpload
            :maxSize="1"
            :accept="'png,jpg,jpeg'"
            class="block mt-1 w-full"
            @file-upload="getUploadData"
          />
        </div>
        <div>
          <BasePrimaryButton type="submit">upload</BasePrimaryButton>
        </div>
      </form>
    </div>
  </div>
</template>
