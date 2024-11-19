import clsx from "clsx";
import classes from "./modal.module.css";

//todo: render this component in a modal div of layout, maybe using ReactDOM.createPortal
export const Modal = ({
  isModalOpen,
  closeModal,

  children,

  curtainExtraClasses,
  mainExtraClasses,
}: {
  isModalOpen: boolean;
  closeModal: () => void;

  children: React.ReactNode;

  curtainExtraClasses?: string;
  mainExtraClasses?: string;
}) => {
  if (!isModalOpen) return null;

  return (
    <>
      <div
        className={clsx(
          classes.curtain,
          curtainExtraClasses && curtainExtraClasses
        )}
        onClick={closeModal}
      />
      <div
        className={clsx(
          classes.main,
          "shadow",
          mainExtraClasses && mainExtraClasses
        )}
      >
        {children}
      </div>
    </>
  );
};
