export const userKey = 'user';

export const rememberKey = 'rememberMe';

export const searchKey = 'histories';

export const excerpts = (str: string, count: number) => {
  if (str.length > count) {
    str = str.substring(0, count) + ' ...';
  }
  return str;
};

export const getUnique = <T extends object[], U extends string>(
  items: T,
  value: U
) => {
  const newItems = items?.map((item) => item[value]).flat();
  return [...new Set(newItems)];
};

export const getFromStorage = <T extends string>(key: T) => {
  if (typeof window !== 'undefined') {
    return JSON.parse(window.localStorage.getItem(key)!);
  }
};

export const setToStorage = <T extends string, U>(key: T, value: U) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeFromStorage = <T extends string>(key: T) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem(key);
  }
};
