export const convertHEICToJPEG = async (file: File) => {
  if (file.type !== "image/heic" && file.type !== "image/heif") {
    return file;
  }

  try {
    const heic2any = (await import("heic2any")).default;
    const jpegBlobOrBlobs = await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.75,
    });

    const jpegBlob = Array.isArray(jpegBlobOrBlobs)
      ? jpegBlobOrBlobs[0]
      : jpegBlobOrBlobs;

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
