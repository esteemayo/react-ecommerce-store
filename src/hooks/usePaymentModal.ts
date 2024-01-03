import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

interface PaymentModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

const usePaymentModal = create<PaymentModalStore>()(
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

export default usePaymentModal;
