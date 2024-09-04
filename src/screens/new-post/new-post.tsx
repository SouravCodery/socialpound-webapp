"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import classes from "./new-post.module.css";
import { logger } from "@/logger/index.logger";

import { NewPostMediaPreview } from "./new-post-media-preview/new-post-media-preview";
import { Loader } from "@/components/loaders/loader/loader";

import { useSWRAddPost } from "@/hooks/swr-hooks/post.swr-hooks";
import { apiSDKInstance } from "@/ig-sdk/ig-sdk.instance";
import { Constants } from "@/constants/constants";
import { SupportedMediaTypes } from "@/models/types/media.types";

export const NewPost = () => {
  const router = useRouter();
  const { trigger, isMutating, data } = useSWRAddPost();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [isPostBeingUploaded, setIsPostBeingUploaded] =
    useState<boolean>(false);

  const [caption, setCaption] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event?.target?.files?.[0]) {
      return;
    }

    const file = event.target.files[0];

    if (file.size > Constants.MAX_MEDIA_SIZE) {
      alert(
        "The selected image is too large. Please select an image smaller than 5MB."
      );
      //todo: Replace with Toast
      return;
    }

    if (file.size < Constants.MIN_MEDIA_SIZE) {
      alert(
        "The selected image is too small. Please select an image greater than 1KB."
      );
      //todo: Replace with Toast
      return;
    }

    if (
      !Constants.SUPPORTED_MEDIA_TYPES.includes(
        file.type as SupportedMediaTypes
      )
    ) {
      alert(
        "The selected image is not supported. Please select a jpg, jpeg, or png image."
      );

      //todo: Replace with Toast
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedMedia(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleCaptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCaption(event.target.value);
  };

  const newPostSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    setIsPostBeingUploaded(true);

    if (!selectedFile || !selectedMedia || !caption) {
      alert("Please add an image and a caption.");
      return;
    }

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
            url: key,
            type: "image",
          },
        ],
        caption,
      });

      alert("Post shared!");

      router.push("/");
    } catch (error) {
      logger.error("Error creating post:", error);
      //todo: Add toast
    } finally {
      setIsPostBeingUploaded(false);
    }
  };

  const openFileInput = () => {
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
      />
      <form onSubmit={newPostSubmitHandler} className={classes.form}>
        <label htmlFor="imageInput" className="hidden">
          Choose an image
        </label>
        <input
          type="file"
          id="imageInput"
          accept="image/jpeg, image/png, image/jpg"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="hidden"
        />
        <textarea
          placeholder="Write a caption for your post"
          value={caption}
          onChange={handleCaptionChange}
          className={classes.caption}
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
