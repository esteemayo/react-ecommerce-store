import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

interface ReviewModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const useReviewModal = create<ReviewModalStore>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () =>
      set(
        produce((state) => {
          state.isOpen = true;
        }),
        false,
        'openReviewModal'
      ),
    onClose: () =>
      set(
        produce((state) => {
          state.isOpen = false;
        }),
        false,
        'closeReviewModal'
      ),
  }))
);
