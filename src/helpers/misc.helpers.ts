export const delay = ({ duration = 1000 }: { duration?: number }) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const isRunningOnClient = () => typeof window !== "undefined";

export const isDevEnvironment = () => process.env.NODE_ENV === "development";

export const trimUsername = (username: string = "") => username.split("@")[0];
