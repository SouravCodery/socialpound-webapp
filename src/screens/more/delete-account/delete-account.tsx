import { useState } from "react";
import { useRouter } from "next/navigation";

import { Confirm } from "@/components/confirm/confirm";
import { localStorageHelpers } from "@/helpers/local-storage.helpers";
import { cookieFlushAfterLogout } from "@/actions/user.actions";
import { apiSDKInstance } from "@/api-sdk/api-sdk.instance";

export const DeleteAccount = ({
  buttonClassName,
}: {
  buttonClassName: string;
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const closeModal = () => {
    if (isDeletingAccount) {
      return;
    }

    setIsModalOpen(false);
  };
  const openModal = () => setIsModalOpen(true);

  const deleteAccount = async () => {
    try {
      if (isDeletingAccount) return;
      setIsDeletingAccount(true);

      localStorageHelpers.removeItem({ key: "post-likes" });
      localStorageHelpers.removeItem({ key: "user" });

      await apiSDKInstance.user.deleteUser();
      await cookieFlushAfterLogout();

      router.replace("/account/sign-in");
    } catch (error) {
    } finally {
      setIsDeletingAccount(false);
      closeModal();
    }
  };

  return (
    <>
      <button
        className={buttonClassName}
        onClick={openModal}
        disabled={isDeletingAccount}
      >
        Delete Account
      </button>
      <Confirm
        title="Are you sure you want to Delete Account?"
        message="It may take upto an hour for your posts to stop reflecting in some feeds. Your likes and comments would become anonymous."
        confirmationButtonText="Delete Account"
        processingText="Deleting Account..."
        isProcessing={isDeletingAccount}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        action={deleteAccount}
      />
    </>
  );
};
