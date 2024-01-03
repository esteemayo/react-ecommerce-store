import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

interface SearchModalStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

const useSearchModal = create<SearchModalStore>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () =>
      set(
        produce((state) => {
          state.isOpen = true;
        }),
        false,
        'openSearchModal'
      ),
    onClose: () =>
      set(
        produce((state) => {
          state.isOpen = false;
        }),
        false,
        'closeSearchModal'
      ),
  }))
);

export default useSearchModal;
