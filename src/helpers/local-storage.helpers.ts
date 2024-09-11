const setItem = ({ key, value }: { key: string; value?: any }): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting item in local storage: ${error}`);
  }
};

const getItem = <T>({ key }: { key: string }): T | null => {
  try {
    const serializedValue = localStorage.getItem(key);
    if (serializedValue === null) {
      return null;
    }
    return JSON.parse(serializedValue) as T;
  } catch (error) {
    console.error(`Error getting item from local storage: ${error}`);
    return null;
  }
};

const removeItem = ({ key }: { key: string }): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item from local storage: ${error}`);
  }
};

export const localStorageHelpers = {
  getItem,
  setItem,
  removeItem,
};
