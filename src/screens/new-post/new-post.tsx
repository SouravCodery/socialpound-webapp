"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import imageCompression, {
  Options as ImageCompressionOptions,
} from "browser-image-compression";
import classes from "./new-post.module.css";

import { Constants } from "@/constants/constants";
import { apiSDKInstance } from "@/api-sdk/api-sdk.instance";
import { convertHEICToJPEG } from "@/helpers/heic.helpers";
import { SupportedMediaTypes } from "@/models/types/media.types";
import { useSWRAddPost } from "@/hooks/swr-hooks/post.swr-hooks";
import { useGetAuthenticatedUserFromLocalStorage } from "@/hooks/user.hooks";
import { NewPostMediaPreview } from "./new-post-media-preview/new-post-media-preview";
import { bakeToast } from "@/components/toasts/toasts";
import { Loader } from "@/components/loaders/loader/loader";

import { logger } from "@/logger/index.logger";

export const NewPost = () => {
  const router = useRouter();
  const { trigger } = useSWRAddPost();
  const { username } = useGetAuthenticatedUserFromLocalStorage();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [processingImage, setProcessingImage] = useState<boolean>(false);

  const [isPostBeingUploaded, setIsPostBeingUploaded] =
    useState<boolean>(false);

  const [caption, setCaption] = useState<string>("");

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      setProcessingImage(true);
      if (!event?.target?.files?.[0]) {
        return;
      }

      const file = event.target.files[0];

      if (file.size < Constants.MIN_MEDIA_SIZE) {
        bakeToast({
          type: "error",
          message:
            "The selected image is too small. Please select an image greater than 1KB.",
        });
        return;
      }

      if (
        !Constants.SUPPORTED_MEDIA_TYPES.includes(
          file.type as SupportedMediaTypes
        )
      ) {
        bakeToast({
          type: "error",
          message:
            "The selected image is not supported. Please select a jpg, jpeg, png, webp or heic image.",
        });

        return;
      }

      const convertedFile = await convertHEICToJPEG(file);

      const imageCompressionOptions: ImageCompressionOptions = {
        maxSizeMB: 4,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
        fileType: "image/webp",
        initialQuality: 0.75,
      };

      let compressedFile = await imageCompression(
        convertedFile,
        imageCompressionOptions
      );

      if (compressedFile.type !== "image/webp") {
        compressedFile = await imageCompression(convertedFile, {
          ...imageCompressionOptions,
          fileType: "image/jpeg",
        });
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
          const currentAspectRatio = parseFloat(
            (img.naturalWidth / img.naturalHeight).toFixed(2)
          );

          if (
            currentAspectRatio > Constants.MAX_IMAGE_ASPECT_RATIO ||
            currentAspectRatio < Constants.MIN_IMAGE_ASPECT_RATIO
          ) {
            setSelectedFile(null);

            setSelectedMedia(null);
            bakeToast({
              type: "error",
              message:
                "The selected image has an invalid aspect ratio. Please select an image with a more balanced aspect ratio. (1:3)-(3:1)",
            });

            if (fileInputRef.current) {
              fileInputRef.current.value = "";
            }

            return;
          }

          setAspectRatio(currentAspectRatio);
          setSelectedFile(compressedFile);
          setSelectedMedia(imageUrl);
        };
      };

      reader.readAsDataURL(compressedFile);
    } catch (error) {
      logger.info("Error handling image:", error);
      bakeToast({
        type: "error",
        message: "Failed to compress the image.",
      });
    } finally {
      setProcessingImage(false);
    }
  };

  const handleCaptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCaption(event.target.value);
  };

  const newPostSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile || !selectedMedia) {
      bakeToast({
        type: "error",
        message: "Please add an image!",
      });
      return;
    }

    setIsPostBeingUploaded(true);

    try {
      const { presignedUrl, key } =
        await apiSDKInstance.awsPresignedUrl.getAWSPresignedUrl({
          size: selectedFile?.size,
          type: selectedFile?.type,
        });

      const headers: HeadersInit = {
        "Content-Type": selectedFile.type,
      };

      const mediaUploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: selectedFile,
        headers,
      });

      if (!mediaUploadResponse.ok) {
        throw new Error("Error uploading media");
      }

      await trigger({
        content: [
          {
            type: "image",
            url: key,
            aspectRatio,
          },
        ],
        caption,
      });

      bakeToast({ message: "Post shared!" });

      router.push(`/profile/${username}`);
    } catch (error) {
      logger.error("Error in newPostSubmitHandler", error);
      bakeToast({ type: "error", message: "Couldn't add post." });
    } finally {
      setIsPostBeingUploaded(false);
    }
  };

  const openFileInput = () => {
    if (processingImage) {
      bakeToast({ message: "Image is being processed" });
      return;
    }

    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={classes.container}>
      <Loader show={isPostBeingUploaded} mode="fixed" text="Sharing Post" />
      <NewPostMediaPreview
        media={selectedMedia}
        openFileInput={openFileInput}
        aspectRatio={aspectRatio}
        processingImage={processingImage}
      />
      <form onSubmit={newPostSubmitHandler} className={classes.form}>
        <label htmlFor="imageInput" className="hidden">
          Choose an image
        </label>
        <input
          type="file"
          id="imageInput"
          accept="image/jpg, image/jpeg, image/png, image/webp, image/heic"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />
        <textarea
          placeholder="Write a caption for your post"
          value={caption}
          onChange={handleCaptionChange}
          className={clsx(classes.caption, "shadow")}
          maxLength={2200}
        />
        <div className={classes.shareButtonContainer}>
          <button
            className={classes.shareButton}
            disabled={isPostBeingUploaded}
          >
            {isPostBeingUploaded === false ? "Share" : "Sharing"}
          </button>
        </div>
      </form>
    </div>
  );
};
