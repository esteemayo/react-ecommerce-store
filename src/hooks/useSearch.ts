'use client';

import { useCallback, useEffect, useState } from 'react';

import { getFromStorage, searchKey, setToStorage } from '@/utils';

interface IHistories {
  id: number;
  query: string;
}

const getAllHistories = () => {
  const histories = getFromStorage(searchKey);
  return histories ?? [];
};

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [histories, setHistories] = useState<IHistories[]>(getAllHistories());

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleDelete = useCallback((id: number) => {
    setHistories((prev) => [...prev].filter((item) => item.id !== id));
  }, []);

  const handleHistory = useCallback(() => {
    const data: IHistories = {
      id: new Date().getTime(),
      query: searchQuery,
    };

    setHistories((prev) => [data, ...prev]);
  }, [searchQuery]);

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      handleHistory();
      console.log(searchQuery);
    },
    [handleHistory, searchQuery]
  );

  useEffect(() => {
    setToStorage(searchKey, histories);
  }, [histories]);

  return {
    histories,
    searchQuery,
    handleChange,
    handleDelete,
    handleSearch,
  };
};
