import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

interface PasswordModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

const usePasswordModal = create<PasswordModalStore>()(
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

export default usePasswordModal;
