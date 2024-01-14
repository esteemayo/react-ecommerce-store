import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { ProductValues } from '../types';
import { getFromStorage, searchKey, setToStorage } from '../utils';

import { searchProducts } from '../services/productService';

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

  const [products, setProducts] = useState<ProductValues[]>([]);
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    try {
      const { data } = await searchProducts(searchQuery);
      setProducts(data);
    } catch (err: unknown) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const handleSearch = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (searchQuery) {
        await onSearchHandler();

        navigate(`/search?q=${searchQuery}`);
        handleHistory();
        console.log(searchQuery);
      }
    },
    [handleHistory, navigate, onSearchHandler, searchQuery]
  );

  useEffect(() => {
    setToStorage(searchKey, histories);
  }, [histories]);

  return {
    products,
    histories,
    isLoading,
    searchQuery,
    handleChange,
    handleDelete,
    handleSearch,
  };
};
