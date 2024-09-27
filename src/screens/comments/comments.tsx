"use client";

import { useCallback } from "react";
import { Virtuoso } from "react-virtuoso";
import classes from "./comments.module.css";

import { useSWRGetCommentsByPostId } from "@/hooks/swr-hooks/comment.swr-hooks";

import { Comment } from "./comment/comment";
import { CommentLoader } from "@/components/loaders/comments/comment-loader";
import { InfiniteLoader } from "@/components/loaders/infinite-loader/infinite-loader";
import { AddComment } from "./comment/add-comment/add-comment";
import { CommentInterface } from "@/models/interfaces/comment.interface";
import { useGetAuthenticatedUserFromLocalStorage } from "@/hooks/user.hooks";

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
  const authenticatedUser = useGetAuthenticatedUserFromLocalStorage();

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

  const updateCommentsAfterNewCommentAddition = ({
    newComment,
  }: {
    newComment: CommentInterface;
  }) => {
    updateComments(
      (data) => {
        return data?.map((each, index) => {
          if (index === 0) {
            return {
              ...each,
              comments: [newComment, ...each.comments],
            };
          }

          return each;
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
          {!error && (
            <div className={classes.noCommentsSub}>Start the conversation.</div>
          )}
        </div>
        {!error && (
          <AddComment
            postId={postId}
            updateCommentsAfterNewCommentAddition={
              updateCommentsAfterNewCommentAddition
            }
          />
        )}
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
            isAuthorizedToDeleteComment={
              authenticatedUser._id === comment?.user?._id ||
              authenticatedUser._id === comment?.postBy
            }
            updateCommentsAfterDeletion={updateCommentsAfterDeletion}
          />
        )}
        data={comments}
        components={{
          Footer: InfiniteLoader,
        }}
      />

      {!error && (
        <AddComment
          postId={postId}
          updateCommentsAfterNewCommentAddition={
            updateCommentsAfterNewCommentAddition
          }
        />
      )}
    </div>
  );
};
