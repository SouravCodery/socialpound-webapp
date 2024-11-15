import clsx from "clsx";
import classes from "./modal.module.css";

//todo: render this component in a modal div of layout, maybe using ReactDOM.createPortal
export const Modal = ({
  isModalOpen,
  closeModal,

  children,
}: {
  isModalOpen: boolean;
  closeModal: () => void;

  children: React.ReactNode;
}) => {
  if (!isModalOpen) return null;

  return (
    <>
      <div className={classes.curtain} onClick={closeModal} />
      <div className={clsx(classes.main, "shadow")}>{children}</div>
    </>
  );
};
