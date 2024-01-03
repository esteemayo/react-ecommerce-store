import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

interface AccountModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

const useAccountModal = create<AccountModalStore>()(
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

export default useAccountModal;
