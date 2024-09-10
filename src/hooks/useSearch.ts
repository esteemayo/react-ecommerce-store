import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';

import { useSidebar } from './useSidebar';
import { useSearchModal } from './useSearchModal';

import { IHistories, IHistory } from '../types';
import { getFromStorage, searchKey, setToStorage } from '../utils';
import { useSearchStore } from './useSearchStore';

const getLocalStorage = () => {
  const histories = getFromStorage(searchKey);
  return histories ?? [];
};

export const useSearch = () => {
  const navigate = useNavigate();
  const sidebarModal = useSidebar();

  const onClose = useSearchModal((state) => state.onClose);
  const isOpen = useSearchModal((state) => state.isOpen);
  const searchProductPending = useSearchStore(
    (state) => state.searchProductPending
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [histories, setHistories] = useState<IHistories>(getLocalStorage());

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleDelete = useCallback((id: string) => {
    setHistories((prev) => {
      return [...prev].filter((item) => item.id !== id);
    });
  }, []);

  const handleHistory = useCallback(() => {
    const data: IHistory = {
      id: new Date().getTime().toString(),
      query: searchQuery,
    };

    setHistories((prev) => {
      if (prev.find((item) => item.query === searchQuery)) {
        return [...new Set(prev)];
      }

      return [data, ...prev];
    });
  }, [searchQuery]);

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (searchQuery) {
        searchProductPending();

        handleHistory();
        setSearchQuery('');

        navigate(`/search?q=${searchQuery}`);

        isOpen && onClose();
        sidebarModal.isOpen && sidebarModal.onClose();
      }
    },
    [
      handleHistory,
      isOpen,
      navigate,
      onClose,
      searchProductPending,
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
