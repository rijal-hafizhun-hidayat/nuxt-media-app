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

const upload = () => {
  console.log(true);
};

const getUploadData = (dataFile: FileUpload) => {
  fileUpload.value = dataFile.file;
  console.log(fileUpload.value);
};
</script>
<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white mt-10 px-4 py-6 rounded shadow-md overflow-x-auto">
      <h1 class="font-bold mb-4">Update Avatar</h1>
      <form @submit.prevent="upload()" class="space-y-4">
        <div>
          <BaseInputLabel>Upload Foto</BaseInputLabel>
          <!-- satuan maxSize menggunakan mb -->
          <BaseFileUpload
            :maxSize="5"
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
