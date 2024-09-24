import { useState } from "react";
import { useRouter } from "next/navigation";

import { Confirm } from "@/components/confirm/confirm";
import { localStorageHelpers } from "@/helpers/local-storage.helpers";
import { cookieFlushAfterLogout } from "@/actions/user.actions";

export const Logout = ({ buttonClassName }: { buttonClassName: string }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const closeModal = () => {
    if (isLoggingOut) return;
    setIsModalOpen(false);
  };
  const openModal = () => setIsModalOpen(true);

  const logout = async () => {
    try {
      if (isLoggingOut) return;
      setIsLoggingOut(true);

      localStorageHelpers.removeItem({ key: "post-likes" });
      localStorageHelpers.removeItem({ key: "user" });

      await cookieFlushAfterLogout();

      router.replace("/account/sign-in");
    } catch (error) {
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
