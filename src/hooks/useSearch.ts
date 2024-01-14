import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { useSearchStore } from './useSearchStore';
import { searchProducts } from '../services/productService';

import { getFromStorage, searchKey, setToStorage } from '../utils';

interface IHistories {
  id: number;
  query: string;
}

const getAllHistories = () => {
  const histories = getFromStorage(searchKey);
  return histories ?? [];
};

export const useSearch = () => {
  const navigate = useNavigate();
  const { fetchProductFailure, fetchProductFulfilled, fetchProductPending } =
    useSearchStore();

  const [histories, setHistories] = useState<IHistories[]>(getAllHistories());
  const [searchQuery, setSearchQuery] = useState('');

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

  const onSearchHandler = useCallback(async () => {
    fetchProductPending();

    try {
      const { data } = await searchProducts(searchQuery);
      fetchProductFulfilled(data);
      console.log(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: unknown | any) {
      console.log(err);
      fetchProductFailure(err.response.data.message);
    }
  }, [
    fetchProductFailure,
    fetchProductFulfilled,
    fetchProductPending,
    searchQuery,
  ]);

  const handleSearch = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (searchQuery) {
        await onSearchHandler();

        navigate(`/search?q=${searchQuery}`);
        handleHistory();
      }
    },
    [handleHistory, navigate, onSearchHandler, searchQuery]
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
