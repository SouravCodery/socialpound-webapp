import { logger } from "@/logger/index.logger";

const setItem = ({ key, value }: { key: string; value?: any }): void => {
  try {
    if (typeof localStorage === "undefined") return;

    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    logger.error(`Error setting item in local storage: ${error}`);
  }
};

const getItem = <T>({ key }: { key: string }): T | null => {
  try {
    if (typeof localStorage === "undefined") null;

    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    logger.error(`Error getting item from local storage: ${error}`);
    return null;
  }
};

const removeItem = ({ key }: { key: string }): void => {
  try {
    if (typeof localStorage === "undefined") return;

    localStorage.removeItem(key);
  } catch (error) {
    logger.error(`Error removing item from local storage: ${error}`);
  }
};

export const localStorageHelpers = {
  getItem,
  setItem,
  removeItem,
};
