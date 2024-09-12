export const generateSingleImageURL = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET!
  );
  formData.append("folder", import.meta.env.VITE_CLOUDINARY_FOLDER_NAME!);
  formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME!);
  try {
    const response = await fetch(import.meta.env.VITE_CLOUDINARY_URL!, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data?.secure_url;
  } catch (error) {
    console.error("Error uploading the image:", error);
    return "";
  }
};
