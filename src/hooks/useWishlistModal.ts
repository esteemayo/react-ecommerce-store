import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

interface WishlistModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

const useWishlistModal = create<WishlistModalStore>()(
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

export default useWishlistModal;
