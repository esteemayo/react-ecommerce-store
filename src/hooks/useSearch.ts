import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { useSearchStore } from './useSearchStore';
import { useSidebar } from './useSidebar';
import { useSearchModal } from './useSearchModal';

import { IHistories } from '../types';
import { getFromStorage, searchKey, setToStorage } from '../utils';

import { searchProducts } from '../services/productService';

const getAllHistories = () => {
  const histories = getFromStorage(searchKey);
  return histories ?? [];
};

export const useSearch = () => {
  const navigate = useNavigate();
  const sidebarModal = useSidebar();

  const onClose = useSearchModal((state) => state.onClose);
  const isOpen = useSearchModal((state) => state.isOpen);
  const {
    isSuccess,
    searchProductFailure,
    searchProductFulfilled,
    searchProductPending,
  } = useSearchStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [histories, setHistories] = useState<IHistories[]>(getAllHistories());

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleDelete = useCallback((id: number) => {
    setHistories((prev) => {
      return [...prev].filter((item) => item.id !== id);
    });
  }, []);

  const handleHistory = useCallback(() => {
    const data: IHistories = {
      id: new Date().getTime(),
      query: searchQuery,
    };

    setHistories((prev) => {
      if (prev.find((item) => item.query === searchQuery)) {
        return [...new Set(prev)];
      }

      return [data, ...prev];
    });
  }, [searchQuery]);

  const onSearchHandler = useCallback(async () => {
    searchProductPending();

    const encodedSearchQuery = encodeURI(searchQuery);

    try {
      const { data } = await searchProducts(encodedSearchQuery);
      searchProductFulfilled(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: unknown | any) {
      console.log(err);
      searchProductFailure(err.response.data.message);
    }
  }, [
    searchProductFailure,
    searchProductFulfilled,
    searchProductPending,
    searchQuery,
  ]);

  const handleSearch = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (searchQuery) {
        await onSearchHandler();

        handleHistory();
        setSearchQuery('');

        isOpen && onClose();
        sidebarModal.isOpen && sidebarModal.onClose();
        isSuccess && navigate(`/search?q=${searchQuery}`);
      }
    },
    [
      handleHistory,
      isOpen,
      isSuccess,
      navigate,
      onClose,
      onSearchHandler,
      searchQuery,
      sidebarModal,
    ]
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
