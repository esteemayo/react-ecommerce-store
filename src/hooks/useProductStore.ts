import { create } from 'zustand';
import { produce } from 'immer';
import { devtools } from 'zustand/middleware';

import { ProductStore, ProductValues } from '../types';

const INITIAL_STATE = {
  products: [],
};

export const useProductStore = create<ProductStore>()(
  devtools((set) => ({
    products: INITIAL_STATE.products,
    onFavorite: (payload) =>
      set(
        produce((state) => {
          state.products.map((item: ProductValues) =>
            item.id === payload.id ? payload : item
          );
        }),
        false,
        'onFavorite'
      ),
  }))
);
