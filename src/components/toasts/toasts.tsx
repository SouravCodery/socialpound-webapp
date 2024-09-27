"use client";
import { useEffect, useState } from "react";
import eventEmitter, { Emitter } from "mitt";
import classes from "./toasts.module.css";

import { GenericToastType } from "@/models/types/toast.types";
import { isRunningOnClient } from "@/helpers/misc.helpers";
import { Toast } from "./toast/toast";

const emitter: Emitter<GenericToastType> = eventEmitter();

export const Toasts = () => {
  const [toasts, setToasts] = useState<GenericToastType["bakeToast"][]>([]);

  const addToast = (toast: GenericToastType["bakeToast"]) => {
    setToasts((prev) => [...prev, toast]);
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
      {toasts.map((toast, index) => (
        <Toast key={toast.key} toast={toast} index={index} />
      ))}
    </div>
  );
};

export const bakeToast = ({
  type = "info",
  message,
}: {
  type?: GenericToastType["bakeToast"]["type"];
  message: string;
}) => {
  if (!isRunningOnClient()) return;

  emitter.emit("bakeToast", { type, message, key: `${message}${Date.now()}` });
};
