import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { produce } from 'immer';

import { CartActionType, CartStore } from '../types';

const INITIAL_STATE = {
  cart: [],
  wishlists: [],
  wished: [],
  qty: 0,
  tax: 0,
  total: 0,
  subtotal: 0,
};

export const useCartStore = create<CartStore & CartActionType>()(
  persist(
    devtools((set, get) => ({
      cart: INITIAL_STATE.cart,
      wishlists: INITIAL_STATE.wishlists,
      wished: INITIAL_STATE.wished,
      qty: INITIAL_STATE.qty,
      tax: INITIAL_STATE.tax,
      total: INITIAL_STATE.total,
      subtotal: INITIAL_STATE.subtotal,
      reset: () =>
        set(
          produce((state) => {
            state.cart = INITIAL_STATE.cart;
            state.qty = INITIAL_STATE.qty;
            state.tax = INITIAL_STATE.tax;
            state.total = INITIAL_STATE.total;
            state.subtotal = INITIAL_STATE.subtotal;
          }),
          false,
          'reset'
        ),
      addProduct: (payload) =>
        set(
          produce((state) => {
            if (state.wished.includes(payload.id)) {
              const wishlistInState = get().wishlists;
              const wishedInState = get().wished;

              state.wishlists = wishlistInState.filter(
                (item: { id: string }) => item.id !== payload.id
              );
              state.wished = wishedInState.filter(
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
            const cartInState = get().cart;

            const inCart = cartInState.find(
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
            const wishlistInState = get().wishlists;
            const wishedInState = get().wished;

            state.wishlists = wishlistInState.filter(
              (item: { id: string }) => item.id !== payload
            );
            state.wished = wishedInState.filter(
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
            const cartInState = get().cart;

            state.cart = cartInState.filter(
              (cartItem: { id: string }) => cartItem.id !== payload
            );
          }),
          false,
          'remove'
        ),
      toggleQuantity: (payload) =>
        set(
          produce((state) => {
            const cartInState = get().cart;

            state.cart = cartInState
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
                      quantity:
                        cartItem.quantity > 1
                          ? cartItem.quantity - 1
                          : cartItem.quantity,
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
            const cartInState = get().cart;

            let { total, qty, subtotal, tax } = cartInState.reduce(
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
