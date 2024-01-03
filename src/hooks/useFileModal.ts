import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

interface FileModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

const useFileModal = create<FileModalStore>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () =>
      set(
        produce((state) => {
          state.isOpen = true;
        }),
        false,
        'openFileModal'
      ),
    onClose: () =>
      set(
        produce((state) => {
          state.isOpen = false;
        }),
        false,
        'closeFileModal'
      ),
  }))
);

export default useFileModal;
