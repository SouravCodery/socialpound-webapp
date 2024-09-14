"use client";
import { useEffect, useState } from "react";
import eventEmitter, { Emitter } from "mitt";

import classes from "./toasts.module.css";
import { Toast } from "./toast/toast";
import { ToastType } from "@/models/types/toast.types";

const emitter: Emitter<ToastType> = eventEmitter();

export const Toasts = () => {
  const [toasts, setToasts] = useState<ToastType["bakeToast"][]>([]);

  const addToast = (toast: ToastType["bakeToast"]) => {
    setToasts((prev) => [toast, ...prev]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (toasts.length > 0) {
        setToasts((prev) => prev.slice(1));
      }
    }, 2500);

    emitter.on("bakeToast", addToast);

    return () => {
      clearInterval(interval);
      emitter.off("bakeToast", addToast);
    };
  }, [toasts]);

  return (
    <div className={classes.toasts}>
      {toasts.map(({ key, message }, index) => (
        <Toast key={key} message={message} index={index} />
      ))}
    </div>
  );
};

export const bakeToast = ({
  type = "info",
  message,
}: {
  type?: ToastType["bakeToast"]["type"];
  message: string;
}) => {
  emitter.emit("bakeToast", { type, message, key: `${message}${Date.now()}` });
};
