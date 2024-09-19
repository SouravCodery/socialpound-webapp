"use client";

import { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import classes from "./comments.module.css";

import { useSWRGetCommentsByPostId } from "@/hooks/swr-hooks/comment.swr-hooks";
import { useSWRGetDecodedUserToken } from "@/hooks/swr-hooks/user.swr-hooks";

import { Comment } from "./comment/comment";
import { CommentLoader } from "@/components/loaders/comments/comment-loader";
import { InfiniteLoader } from "@/components/loaders/infinite-loader/infinite-loader";
import { AddComment } from "./comment/add-comment/add-comment";

export const Comments = ({ postId }: { postId: string }) => {
  const {
    data,
    error,
    setSize,
    isLoading,
    isNextPageAvailable,
    isNextPageLoading,
    updateComments,
  } = useSWRGetCommentsByPostId({
    postId,
  });

  const comments = data?.flatMap((each) => each.comments) ?? [];

  const { userDecodedToken } = useSWRGetDecodedUserToken();
  const authenticatedUserEmail = userDecodedToken?.email;

  const updateCommentsAfterDeletion = ({
    commentId,
  }: {
    commentId: string;
  }) => {
    updateComments(
      (data) => {
        return data?.map((each) => {
          return {
            ...each,
            comments: each.comments.filter(
              (comment) => comment._id !== commentId
            ),
          };
        });
      },
      {
        revalidate: false,
      }
    );
  };

  const loadMore = useCallback(() => {
    if (isNextPageLoading) {
      return;
    }

    setSize((prevSize) => prevSize + 1);
  }, [setSize, isNextPageLoading]);

  if (isLoading) {
    return (
      <div className={classes.comments}>
        {[...Array(7)].map((_, index) => (
          <CommentLoader key={index} />
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className={classes.comments}>
        <div className={classes.noComments}>
          <h2>No comments yet.</h2>
          <div className={classes.noCommentsSub}>Start the conversation.</div>
        </div>
        <AddComment postId={postId} updateComments={updateComments} />
      </div>
    );
  }

  if (error && !data) {
    throw error;
  }

  return (
    <div className={classes.comments}>
      <Virtuoso
        className={classes.virtualCommentsList}
        style={{ height: "90vh" }}
        context={{ isNextPageAvailable, loadMore }}
        itemContent={(index, comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            //todo: User can delete any comment if the comment is on his post
            isOwnComment={authenticatedUserEmail === comment?.user?.username}
            updateCommentsAfterDeletion={updateCommentsAfterDeletion}
          />
        )}
        data={comments}
        components={{
          Footer: InfiniteLoader,
        }}
      />

      <AddComment postId={postId} updateComments={updateComments} />
    </div>
  );
};
