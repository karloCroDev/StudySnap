'use client';

export const useLocalStorage = (key: string) => {
  const setItem = (value: any) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item && JSON.parse(item);
    } catch (error) {
      console.error(error);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {}
  };

  return { setItem, getItem, removeItem };
};
