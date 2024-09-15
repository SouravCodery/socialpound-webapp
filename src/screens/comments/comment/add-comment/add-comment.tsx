"use client";

import { useState } from "react";

import classes from "./add-comment.module.css";

import { logger } from "@/logger/index.logger";
import { useSWRAddComment } from "@/hooks/swr-hooks/comment.swr-hooks";
import { Spinner } from "@/components/loaders/spinner/spinner";
import { bakeToast } from "@/components/toasts/toasts";

export const AddComment = ({
  postId,
  updateComments,
}: {
  postId: string;
  updateComments: Function;
}) => {
  const { trigger, isMutating } = useSWRAddComment();

  const [text, setText] = useState<string>("");

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const addCommentSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!text) {
      bakeToast({ type: "error", message: "Please add an image and a text." });
      return;
    }

    try {
      await trigger({
        commentOn: "Post",
        post: postId,
        parentComment: undefined,
        text,
      });

      setText("");

      await updateComments();
    } catch (error) {
      logger.error("Error add comment:", error);
    }
  };

  return (
    <div className={classes.container}>
      {/* todo: add user profile image */}
      <form onSubmit={addCommentSubmitHandler} className={classes.form}>
        <input
          placeholder="Add a comment..."
          value={text}
          onChange={handleTextChange}
          className={classes.text}
          maxLength={2200}
        />
        <div className={classes.shareButtonContainer}>
          {isMutating === false ? (
            <button className={classes.shareButton} disabled={isMutating}>
              ↑
            </button>
          ) : (
            <div className={classes.spinner}>
              <Spinner />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
