import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

interface CartModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const useCartModal = create<CartModalStore>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () =>
      set(
        produce((state) => {
          state.isOpen = true;
        }),
        false,
        'openCartModal'
      ),
    onClose: () =>
      set(
        produce((state) => {
          state.isOpen = false;
        }),
        false,
        'closeCartModal'
      ),
  }))
);
