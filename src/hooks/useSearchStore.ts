import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

import { SearchActionType, SearchStore } from '../types';

const INITIAL_STATE = {
  query: '',
  products: [],
  histories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const useSearchStore = create<SearchStore & SearchActionType>()(
  devtools((set) => ({
    query: INITIAL_STATE.query,
    products: INITIAL_STATE.products,
    histories: INITIAL_STATE.histories,
    isError: INITIAL_STATE.isError,
    isLoading: INITIAL_STATE.isLoading,
    isSuccess: INITIAL_STATE.isSuccess,
    message: INITIAL_STATE.message,
    searchProductPending: () =>
      set(
        produce((state) => {
          state.isLoading = true;
        }),
        false,
        'pending'
      ),
    searchProductFulfilled: (payload) =>
      set(
        produce((state) => {
          state.isLoading = false;
          state.products = payload;
          state.isSuccess = true;
        }),
        false,
        'fulfilled'
      ),
    searchProductFailure: (payload) =>
      set(
        produce((state) => {
          state.isError = true;
          state.isLoading = false;
          state.isSuccess = false;
          state.message = payload;
        }),
        false,
        'rejected'
      ),
  }))
);
