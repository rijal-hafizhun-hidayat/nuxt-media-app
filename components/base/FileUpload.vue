<script setup lang="ts">
const props = defineProps({
  maxSize: {
    type: Number,
    default: 5,
    required: true,
  },
  accept: {
    type: String,
    default: "image/*",
  },
});
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
const emit = defineEmits(["file-upload"]);
const filePlaceHolder: Ref<String> = ref("no file chosen");
const errors: Ref<String[]> = ref([]);
const uploadReady: Ref<Boolean> = ref(true);
const fileUpload: FileUpload = reactive({
  file: "",
  name: "",
  size: 0,
  type: "",
  fileExtention: "",
  url: "",
  isImage: false,
  isUploaded: false,
});

const handleFileChange = (e: Event) => {
  errors.value = [];
  const target = e.target as HTMLInputElement;
  if ((target.files as FileList) && (target.files as FileList)[0]) {
    if (isValidFile((target.files as FileList)[0])) {
      // Get uploaded file
      const file: File = (target.files as FileList)[0];
      // Get file size
      const fileSize = Math.round((file.size / 1024 / 1024) * 100) / 100;
      // Get file extension
      const fileExtention: string = file.name.split(".").pop()!;
      // Get file name
      const fileName = file.name.split(".").shift();
      // Check if file is an image
      const isImage = ["jpg", "jpeg", "png"].includes(fileExtention);
      // Print to console
      // console.log(fileSize, fileExtention, fileName, isImage);

      fileUpload.file = file;
      fileUpload.name = fileName!;
      fileUpload.size = fileSize;
      fileUpload.type = file.type;
      fileUpload.fileExtention = fileExtention;
      fileUpload.isImage = isImage;
      fileUpload.isUploaded = true;

      filePlaceHolder.value = fileUpload.name + "." + fileUpload.fileExtention;
      sendDataToParent();
    } else {
      console.log(errors.value);
    }
  }
};

const isFileSizeValid = (fileSize: number) => {
  if (fileSize <= props.maxSize) {
    console.log("File size is valid");
  } else {
    errors.value.push(`File size should be less than ${props.maxSize} MB`);
  }
};

const isFileTypeValid = (fileExtention: string) => {
  // console.log(props.accept.split(","));
  if (props.accept.split(",").includes(fileExtention)) {
    console.log("File type is valid");
  } else {
    errors.value.push(`File type should be ${props.accept}`);
  }
};

const isValidFile = (file: File) => {
  isFileSizeValid(Math.round((file.size / 1024 / 1024) * 100) / 100);
  isFileTypeValid(file.name.split(".").pop()!);
  if (errors.value.length === 0) {
    return true;
  } else {
    return false;
  }
};

const resetFileInput = () => {
  uploadReady.value = true;
  fileUpload.name = "";
  fileUpload.size = 0;
  fileUpload.type = "";
  fileUpload.fileExtention = "";
  fileUpload.url = "";
  fileUpload.isImage = false;
  fileUpload.isUploaded = false;
  filePlaceHolder.value = "no file chosen";
  sendDataToParent();
};

const sendDataToParent = () => {
  emit("file-upload", fileUpload);
};
</script>
<template>
  <div class="space-y-4">
    <div class="flex flex-row items-center">
      <input
        type="file"
        id="custom-input"
        hidden
        @change="handleFileChange($event)"
      />
      <label
        for="custom-input"
        class="block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-gray-50 hover:bg-gray-100 cursor-pointer"
      >
        Choose file
      </label>
      <label
        @click="resetFileInput()"
        class="block text-sm text-slate-500 mr-4 py-2 px-4 rounded-md border-0 font-semibold bg-gray-50 hover:bg-gray-100 cursor-pointer"
      >
        Hapus File
      </label>
      <label class="text-sm text-slate-500">{{ filePlaceHolder }}</label>
    </div>
    <div v-for="error in errors">
      <BaseInputError :message="error as string" />
    </div>
  </div>
</template>
