export const delay = ({ duration = 1000 }: { duration?: number }) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const isRunningOnClient = () => typeof window !== "undefined";
