import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

interface SidebarStore {
  isOpen: boolean;
  onOpen(): void;
  onClose(): void;
}

export const useSidebar = create<SidebarStore>()(
  devtools((set) => ({
    isOpen: false,
    onOpen: () =>
      set(
        produce((state) => {
          state.isOpen = true;
        }),
        false,
        'openSidebar'
      ),
    onClose: () =>
      set(
        produce((state) => {
          state.isOpen = false;
        }),
        false,
        'closeSidebar'
      ),
  }))
);
