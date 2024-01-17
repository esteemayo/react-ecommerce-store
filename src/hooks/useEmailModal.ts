import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

interface EmailModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const useEmailModal = create<EmailModalStore>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () =>
      set(
        produce((state) => {
          state.isOpen = true;
        }),
        false,
        'openEmailModal'
      ),
    onClose: () =>
      set(
        produce((state) => {
          state.isOpen = false;
        }),
        false,
        'closeEmailModal'
      ),
  }))
);
