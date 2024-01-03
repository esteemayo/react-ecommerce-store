import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { produce } from 'immer';

import { CartStore } from '@/types';

export const useCartStore = create<CartStore>()(
  persist(
    devtools((set) => ({
      cart: [],
      wishlists: [],
      wished: [],
      qty: 0,
      tax: 0,
      total: 0,
      subtotal: 0,
      reset: () =>
        set(
          produce((state) => {
            state.cart = [];
            state.qty = 0;
            state.tax = 0;
            state.total = 0;
            state.subtotal = 0;
          }),
          false,
          'reset'
        ),
      addProduct: (payload) =>
        set(
          produce((state) => {
            if (state.wished.includes(payload.id)) {
              state.wishlists = state.wishlists.filter(
                (item: { id: string }) => item.id !== payload.id
              );
              state.wished = state.wished.filter(
                (item: string) => item !== payload.id
              );

              state.qty++;
              state.cart.push(payload);
              state.total += payload.price * payload.quantity;
            } else {
              state.qty++;
              state.cart.push(payload);
              state.total += payload.price * payload.quantity;
            }
          }),
          false,
          'addProduct'
        ),
      addWishlist: (payload) =>
        set(
          produce((state) => {
            const inCart = state.cart.find(
              (item: { id: string }) => item.id === payload.id
            );

            state.wishlists.push(payload);
            state.wished.push(payload.id);

            if (inCart) {
              state.cart = state.cart.filter(
                (item: { id: string }) => item.id !== payload.id
              );
            }
          }),
          false,
          'addWishlist'
        ),
      removeWishlist: (payload) =>
        set(
          produce((state) => {
            state.wishlists = state.wishlists.filter(
              (item: { id: string }) => item.id !== payload
            );
            state.wished = state.wished.filter(
              (item: string) => item !== payload
            );
          }),
          false,
          'removeWishlist'
        ),
      clearCart: () =>
        set(
          produce((state) => {
            state.cart = [];
          }),
          false,
          'clearCart'
        ),
      remove: (payload) =>
        set(
          produce((state) => {
            state.cart = state.cart.filter(
              (cartItem: { id: string }) => cartItem.id !== payload
            );
          }),
          false,
          'remove'
        ),
      toggleQuantity: (payload) =>
        set(
          produce((state) => {
            state.cart = state.cart
              .map((cartItem: { id: string; quantity: number }) => {
                if (cartItem.id === payload.id) {
                  if (payload.type === 'inc') {
                    return {
                      ...cartItem,
                      quantity:
                        cartItem.quantity < 10
                          ? cartItem.quantity + 1
                          : cartItem.quantity,
                    };
                  }

                  if (payload.type === 'dec') {
                    return {
                      ...cartItem,
                      quantity: cartItem.quantity - 1,
                    };
                  }
                }
                return cartItem;
              })
              .filter(
                (cartItem: { quantity: number }) => cartItem.quantity !== 0
              );
          }),
          false,
          'toggleQuantity'
        ),
      calcTotals: () =>
        set(
          produce((state) => {
            let { total, qty, subtotal, tax } = state.cart.reduce(
              (
                cartTotal: {
                  subtotal: number;
                  qty: number;
                  tax: number;
                  total: number;
                },
                cartItem: { price: number; quantity: number }
              ) => {
                const { price, quantity } = cartItem;
                const itemTotal = price * quantity;

                cartTotal.subtotal += itemTotal;
                cartTotal.qty += quantity;
                cartTotal.tax = cartTotal.subtotal * 0.07;
                cartTotal.total = cartTotal.subtotal + cartTotal.tax;
                return cartTotal;
              },
              {
                total: 0,
                qty: 0,
                subtotal: 0,
                tax: 0,
              }
            );

            total = parseFloat(total.toFixed(2));
            qty = parseFloat(qty.toFixed(2));
            subtotal = parseFloat(subtotal.toFixed(2));
            tax = parseFloat(tax.toFixed(2));

            state.qty = qty;
            state.tax = tax;
            state.total = total;
            state.subtotal = subtotal;
          }),
          false,
          'calcTotals'
        ),
    })),
    { name: 'cart' }
  )
);
