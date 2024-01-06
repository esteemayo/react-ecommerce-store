import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

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
