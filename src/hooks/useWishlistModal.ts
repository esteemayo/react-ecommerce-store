import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

interface WishlistModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const useWishlistModal = create<WishlistModalStore>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () =>
      set(
        produce((state) => {
          state.isOpen = true;
        }),
        false,
        'openWishlistModal'
      ),
    onClose: () =>
      set(
        produce((state) => {
          state.isOpen = false;
        }),
        false,
        'closeWishlistModal'
      ),
  }))
);
