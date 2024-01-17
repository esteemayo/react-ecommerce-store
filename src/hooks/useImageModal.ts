import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

interface ImageModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const useImageModal = create<ImageModalStore>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () =>
      set(
        produce((state) => {
          state.isOpen = true;
        }),
        false,
        'openImageModal'
      ),
    onClose: () =>
      set(
        produce((state) => {
          state.isOpen = false;
        }),
        false,
        'closeImageModal'
      ),
  }))
);
