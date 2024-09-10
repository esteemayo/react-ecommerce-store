import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

import { SearchActionType, SearchStore } from '../types';

const INITIAL_STATE = {
  products: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: '',
};

export const useSearchStore = create<SearchStore & SearchActionType>()(
  devtools((set) => ({
    products: INITIAL_STATE.products,
    isError: INITIAL_STATE.isError,
    isLoading: INITIAL_STATE.isLoading,
    isSuccess: INITIAL_STATE.isSuccess,
    message: INITIAL_STATE.message,
    reset: () =>
      set(
        produce((state) => {
          state.isError = INITIAL_STATE.isError;
          state.isLoading = INITIAL_STATE.isLoading;
          state.isSuccess = INITIAL_STATE.isSuccess;
          state.message = INITIAL_STATE.message;
        }),
        false,
        'reset'
      ),
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
