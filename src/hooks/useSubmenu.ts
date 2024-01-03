import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

import { sublinks } from '@/data';
import { OpenSubmenu, SubmenuStore } from '@/types';

export const useSubmenu = create<SubmenuStore>()(
  devtools((set) => ({
    isOpen: false,
    location: {},
    page: {
      page: '',
      links: [],
    },
    openSubmenu: (payload) =>
      set(
        produce((state: OpenSubmenu) => {
          state.page = sublinks.find((link) => link.page === payload.page);
          state.location = payload.coordinates;
          state.isOpen = true;
        }),
        false,
        'openSubmenu'
      ),
    closeSubmenu: () =>
      set(
        produce((state: { isOpen: boolean }) => {
          state.isOpen = false;
        }),
        false,
        'closeSubmenu'
      ),
  }))
);
