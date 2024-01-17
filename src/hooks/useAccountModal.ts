import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

interface AccountModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const useAccountModal = create<AccountModalStore>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () =>
      set(
        produce((state) => {
          state.isOpen = true;
        }),
        false,
        'openAccountModal'
      ),
    onClose: () =>
      set(
        produce((state) => {
          state.isOpen = false;
        }),
        false,
        'closeAccountModal'
      ),
  }))
);
