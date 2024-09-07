import { useCallback } from 'react';

import { useAuth } from './useAuth';
import { useSidebar } from './useSidebar';

import { logout } from '../services/authService';

export const useLogout = () => {
  const onClose = useSidebar((state) => state.onClose);
  const isOpen = useSidebar((state) => state.isOpen);
  const logoutUser = useAuth((state) => state.logoutUser);

  const handleLogout = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      await logout();
      logoutUser();
      isOpen && onClose();
    },
    [isOpen, logoutUser, onClose]
  );
  return {
    handleLogout,
  };
};
