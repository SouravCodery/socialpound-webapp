import clsx from "clsx";
import classes from "./modal.module.css";

import { Spinner } from "../loaders/spinner/spinner";

//todo: render this component in a modal div of layout, maybe using ReactDOM.createPortal
export const Modal = ({
  title,
  message,
  confirmationButtonText,
  processingText,

  isProcessing,

  isModalOpen,
  closeModal,
}: {
  title: string;
  message: string;
  confirmationButtonText: string;
  processingText: string;

  isProcessing: boolean;

  isModalOpen: boolean;
  closeModal: () => void;
}) => {
  if (!isModalOpen) return null;

  return (
    <>
      <div className={classes.curtain} onClick={closeModal} />
      <div className={clsx(classes.confirmation, "shadow")}>
        <div className={classes.header}>
          <div className={classes.title}>{title}</div>
          <div className={classes.message}>{message}</div>
        </div>
        <div className={classes.processing}>{isProcessing && <Spinner />}</div>
        <div className={classes.actions}>
          <button
            className={clsx(classes.actionButton, classes.confirm)}
            onClick={closeModal}
            disabled={isProcessing}
          >
            {isProcessing === false ? confirmationButtonText : processingText}
          </button>
          {isProcessing === false && (
            <button
              className={clsx(classes.actionButton, classes.cancel)}
              onClick={closeModal}
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </>
  );
};
