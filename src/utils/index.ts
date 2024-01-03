export const userKey = 'user';

export const rememberKey = 'rememberMe';

export const searchKey = 'histories';

export const excerpts = (str: string, count: number) => {
  if (str.length > count) {
    str = str.substr(0, count) + ' ...';
  }
  return str;
};

export const getUnique = (items: any, value: string) => {
  const newItems = items
    .map((item: { [x: string]: any }) => item[value])
    .flat();
  return [...new Set(newItems)];
};

export const getFromStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return JSON.parse(window.localStorage.getItem(key));
  }
};

export const setToStorage = (key: string, value: any) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeFromStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem(key);
  }
};
