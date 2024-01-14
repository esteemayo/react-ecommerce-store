import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';

import { ProductValue } from '../types';

interface SearchStore {
  products: ProductValue[];
  isError: boolean;
  isLoading: boolean;
  message: string;
}

interface SearchActionType {
  fetchProductPending(): void;
  fetchProductFulfilled(products: ProductValue[]): void;
  fetchProductFailure(payload: string): void;
}

const INITIAL_STATE = {
  products: [],
  isError: false,
  isLoading: false,
  message: '',
};

export const useSearchStore = create<SearchStore & SearchActionType>()(
  devtools((set) => ({
    products: INITIAL_STATE.products,
    isError: INITIAL_STATE.isError,
    isLoading: INITIAL_STATE.isLoading,
    message: INITIAL_STATE.message,
    fetchProductPending: () =>
      set(
        produce((state) => {
          state.isLoading = true;
        }),
        false,
        'pending'
      ),
    fetchProductFulfilled: (payload) =>
      set(
        produce((state) => {
          state.products = payload;
          state.isLoading = false;
        }),
        false,
        'fulfilled'
      ),
    fetchProductFailure: (payload) =>
      set(
        produce((state) => {
          state.isError = true;
          state.isLoading = false;
          state.message = payload;
        })
      ),
  }))
);
