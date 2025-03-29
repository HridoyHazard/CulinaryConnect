import axios from "axios";

// Cloudinary Configuration
const cloudinaryPreset = "Culinary";
const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dfyewpdn8/image/upload";

// Function to upload the image to Cloudinary
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", cloudinaryPreset);

  try {
    const response = await axios.post(cloudinaryUrl, formData);
    return response.data.url; 
  } catch (error) {
    console.error("Error uploading image:", error);
    throw new Error("Image upload failed");
  }
};
