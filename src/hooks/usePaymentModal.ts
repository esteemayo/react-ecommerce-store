import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

interface PaymentModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const usePaymentModal = create<PaymentModalStore>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () =>
      set(
        produce((state) => {
          state.isOpen = true;
        }),
        false,
        'openPaymentModal'
      ),
    onClose: () =>
      set(
        produce((state) => {
          state.isOpen = false;
        }),
        false,
        'closePaymentModal'
      ),
  }))
);
