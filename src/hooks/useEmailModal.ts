import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

interface EmailModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

const useEmailModal = create<EmailModalStore>()(
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

export default useEmailModal;
