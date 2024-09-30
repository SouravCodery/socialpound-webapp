import clsx from "clsx";
import classes from "./new-post-media-preview.module.css";

export const NewPostMediaPreview = ({
  media,
  openFileInput,
  aspectRatio,
  processingImage,
}: {
  media: string | null;
  openFileInput: () => void;
  aspectRatio: number;
  processingImage: boolean;
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
        <div className={classes.uploadMediaPromptButton}>
          {processingImage ? "Processing Image" : "Click to upload an Image"}
        </div>
      )}
    </div>
  );
};
