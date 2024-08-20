"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

import classes from "./new-post.module.css";

import { NewPostMediaPreview } from "./new-post-media-preview/new-post-media-preview";
import { logger } from "@/logger/index.logger";

import { useSWRAddPost } from "@/hooks/swr-hooks/post.swr-hooks";

import { Loader } from "@/components/loaders/loader/loader";

const MAX_MEDIA_SIZE = 4 * 1024 * 1024; // 4MB in bytes

export const NewPost = () => {
  const router = useRouter();
  const { trigger, isMutating, data } = useSWRAddPost();

  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [caption, setCaption] = useState<string>("");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (file.size > MAX_MEDIA_SIZE) {
        alert(
          "The selected image is too large. Please select an image smaller than 4MB."
        );
        //Replace with Toast
        return;
      }

      const reader = new FileReader();

      reader.onloadend = () => {
        setSelectedMedia(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCaptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCaption(event.target.value);
  };

  const newPostSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedMedia || !caption) {
      alert("Please add an image and a caption.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", selectedMedia);
      formData.append("caption", caption);

      // logger.info("From Form", formData, selectedMedia, caption);

      await trigger({
        content: [
          {
            url: "https://images.unsplash.com/photo-1562222998-b3ad3853f657?q=80&w=2667&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            type: "image",
          },
        ],
        caption,
      });

      alert("Post shared!");

      router.push("/");
    } catch (error) {
      logger.error("Error creating post:", error);
    }
  };

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={classes.container}>
      <Loader show={isMutating} mode="fixed" text="Sharing Post" />
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
          accept="image/*"
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
          <button className={classes.shareButton} disabled={isMutating}>
            {isMutating === false ? "Share" : "Sharing"}
          </button>
        </div>
      </form>
    </div>
  );
};
