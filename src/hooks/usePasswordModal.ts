import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

interface PasswordModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const usePasswordModal = create<PasswordModalStore>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () =>
      set(
        produce((state) => {
          state.isOpen = true;
        }),
        false,
        'openPasswordModal'
      ),
    onClose: () =>
      set(
        produce((state) => {
          state.isOpen = false;
        }),
        false,
        'closePasswordModal'
      ),
  }))
);
