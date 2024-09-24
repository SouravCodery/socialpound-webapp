export const delay = ({ duration = 1000 }: { duration?: number }) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const isRunningOnClient = () => typeof window !== "undefined";

export const isDevEnvironment = () => process.env.NODE_ENV === "development";

export const trimUsername = (username: string = "") => username.split("@")[0];

export const convertStringDaysToSeconds = ({ key }: { key: String }) => {
  return Number(key.replace("d", "")) * 24 * 60 * 60;
};
