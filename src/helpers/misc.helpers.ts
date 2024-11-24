export const delay = ({ duration = 1000 }: { duration?: number }) =>
  new Promise((resolve) => setTimeout(resolve, duration));

export const isRunningOnClient = () => typeof window !== "undefined";

export const isDevEnvironment = () => process.env.NODE_ENV === "development";

export const trimUsername = (username: string = "") => username.split("@")[0];

export const convertStringDaysToSeconds = ({ key }: { key: String }) => {
  return Number(key.replace("d", "")) * 24 * 60 * 60;
};

export const formatDuration = ({ duration }: { duration: number }) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  return [
    hours > 0 ? String(hours).padStart(2, "0") : null,
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ]
    .filter(Boolean)
    .join(":");
};
