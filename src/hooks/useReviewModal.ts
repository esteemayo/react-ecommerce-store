import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

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
