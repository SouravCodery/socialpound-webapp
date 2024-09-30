import clsx from "clsx";
import classes from "./new-post-media-preview.module.css";
import { Spinner } from "@/components/loaders/spinner/spinner";

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
          {processingImage ? (
            <div className={classes.processingImage}>
              <Spinner />
              <div className={classes.processingImageText}>
                Processing Image
              </div>
            </div>
          ) : (
            "Click to upload an Image"
          )}
        </div>
      )}
    </div>
  );
};
