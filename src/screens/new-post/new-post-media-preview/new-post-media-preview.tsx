import clsx from "clsx";
import classes from "./new-post-media-preview.module.css";

export const NewPostMediaPreview = ({
  media,
  openFileInput,
}: {
  media: string | null;
  openFileInput: () => void;
}) => {
  return (
    <div className={clsx(classes.container, "shadow")} onClick={openFileInput}>
      {media ? (
        <img src={media} alt="Media" className={classes.media} />
      ) : (
        <button className={classes.uploadMediaPrompt}>Click to upload</button>
      )}
    </div>
  );
};
