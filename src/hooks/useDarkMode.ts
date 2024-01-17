import { create } from 'zustand';
import { produce } from 'immer';
import { devtools, persist } from 'zustand/middleware';

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
