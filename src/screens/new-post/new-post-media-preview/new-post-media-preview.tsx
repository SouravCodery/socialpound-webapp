import clsx from "clsx";
import classes from "./new-post-media-preview.module.css";

export const NewPostMediaPreview = ({
  media,
  openFileInput,
  aspectRatio,
}: {
  media: string | null;
  openFileInput: () => void;
  aspectRatio: number;
}) => {
  return (
    <div
      className={clsx(classes.container, "shadow")}
      style={{ aspectRatio }}
      onClick={openFileInput}
    >
      {media ? (
        <img src={media} alt="Media" className={classes.media} />
      ) : (
        <button className={classes.uploadMediaPromptButton}>
          Click to upload an Image
        </button>
      )}
    </div>
  );
};
