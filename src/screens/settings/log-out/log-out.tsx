import { useState } from "react";

import { Confirm } from "@/components/confirm/confirm";
import { localStorageHelpers } from "@/helpers/local-storage.helpers";
import { cookieFlushAfterLogout } from "@/actions/user.actions";
import { signOut } from "next-auth/react";

export const Logout = ({ buttonClassName }: { buttonClassName: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  const logout = async () => {
    try {
      if (isLoggingOut) return;
      setIsLoggingOut(true);

      localStorageHelpers.removeItem({ key: "post-likes" });

      await cookieFlushAfterLogout();
      await signOut();
    } catch (error) {
      console.log("Error in logout", { error });
    } finally {
      setIsLoggingOut(false);
      closeModal();
    }
  };

  return (
    <>
      <button
        className={buttonClassName}
        onClick={openModal}
        disabled={isLoggingOut}
      >
        Log Out
      </button>
      <Confirm
        title="Are you sure you want to Log Out?"
        message="You will be logged out of your account."
        confirmationButtonText="Log Out"
        processingText="Logging Out..."
        isProcessing={isLoggingOut}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        action={logout}
      />
    </>
  );
};
