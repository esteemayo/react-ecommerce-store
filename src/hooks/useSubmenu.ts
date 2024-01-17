import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

import { sublinks } from '../data';
import { OpenSubmenu, SubmenuActionType, SubmenuStore } from '../types';

const INITIAL_STATE: SubmenuStore = {
  isOpen: false,
  location: {},
  page: {
    page: '',
    links: [],
  },
};

export const useSubmenu = create<SubmenuStore & SubmenuActionType>()(
  devtools((set) => ({
    isOpen: INITIAL_STATE.isOpen,
    location: INITIAL_STATE.location,
    page: INITIAL_STATE.page,
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
