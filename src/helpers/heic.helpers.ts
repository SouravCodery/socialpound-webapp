import heic2any from "heic2any";

export const convertHEICToJPEG = async (file: File) => {
  if (file.type !== "image/heic" && file.type !== "image/heif") {
    return file;
  }

  try {
    const jpegBlob = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 1,
    });

    const jpegFile = new File(
      [jpegBlob as Blob],
      file.name.replace(/\.[^/.]+$/, ".jpeg"),
      {
        type: "image/jpeg",
        lastModified: Date.now(),
      }
    );

    return jpegFile;
  } catch (error) {
    throw new Error("Failed to convert HEIC to JPEG: " + error);
  }
};
