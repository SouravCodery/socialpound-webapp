import clsx from "clsx";
import classes from "./confirm.module.css";

import { Modal } from "../modal/modal";
import { Spinner } from "../loaders/spinner/spinner";

export const Confirm = ({
  title,
  message,
  confirmationButtonText,
  processingText,

  isProcessing,

  isModalOpen,
  closeModal,
  action,
}: {
  title: string;
  message: string;
  confirmationButtonText: string;
  processingText: string;

  isProcessing: boolean;

  isModalOpen: boolean;
  closeModal: () => void;
  action: () => void;
}) => {
  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal}>
      <div className={classes.header}>
        <div className={classes.title}>{title}</div>
        <div className={classes.message}>{message}</div>
      </div>
      <div className={classes.processing}>{isProcessing && <Spinner />}</div>
      <div className={classes.actions}>
        <button
          className={clsx(classes.actionButton, classes.confirm)}
          onClick={action}
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
    </Modal>
  );
};
