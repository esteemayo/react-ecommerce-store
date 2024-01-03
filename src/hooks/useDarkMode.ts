import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { produce } from 'immer';

interface DarkModeStore {
  mode: boolean;
  toggle(): void;
}

export const useDarkMode = create<DarkModeStore>()(
  persist(
    devtools((set) => ({
      mode: false,
      toggle: () =>
        set(
          produce((state) => {
            state.mode = !state.mode;
          }),
          false,
          'toggleMode'
        ),
    })),
    { name: 'darkMode' }
  )
);
