import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { produce } from 'immer';
// import jwtDecode from 'jwt-decode';

import { AuthActionType, AuthStore } from '../types';
import {
  getFromStorage,
  removeFromStorage,
  setToStorage,
  tokenKey,
} from '../utils';

// import { getJwt } from '../services/authService';

// const token = getJwt();
const user = getFromStorage(tokenKey);

const INITIAL_STATE = {
  user: user ?? null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// if (token) {
//   const decodedToken = jwtDecode(token);
//   const expiryDate = new Date().getTime();

//   if (decodedToken.exp * 1000 < expiryDate) {
//     removeFromStorage(tokenKey);
//     INITIAL_STATE.user = null;
//   }
// }

export const useAuth = create<AuthStore & AuthActionType>()(
  persist(
    devtools((set) => ({
      user: INITIAL_STATE.user,
      isLoading: INITIAL_STATE.isLoading,
      isError: INITIAL_STATE.isError,
      isSuccess: INITIAL_STATE.isSuccess,
      message: INITIAL_STATE.message,
      reset: () =>
        set(
          produce((state) => {
            state.user = INITIAL_STATE.user;
            state.isLoading = INITIAL_STATE.isLoading;
            state.isError = INITIAL_STATE.isError;
            state.isSuccess = INITIAL_STATE.isSuccess;
          }),
          false,
          'reset'
        ),
      loginUserPending: () =>
        set(
          produce((state) => {
            state.isLoading = true;
          }),
          false,
          'pending'
        ),
      loginUserFulfilled: (payload) =>
        set(
          produce((state) => {
            state.user = payload;
            setToStorage(tokenKey, payload);
            state.isLoading = false;
            state.isSuccess = true;
          }),
          false,
          'fulfilled'
        ),
      loginUserRejected: (payload) =>
        set(
          produce((state) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.user = null;
            state.message = payload;
          }),
          false,
          'rejected'
        ),
      registerUserPending: () =>
        set(
          produce((state) => {
            state.isLoading = true;
          }),
          false,
          'pending'
        ),
      registerUserFulfilled: (payload) =>
        set(
          produce((state) => {
            state.user = payload;
            setToStorage(tokenKey, payload);
            state.isLoading = false;
            state.isSuccess = true;
          }),
          false,
          'fulfilled'
        ),
      registerUserRejected: (payload) =>
        set(
          produce((state) => {
            state.isError = true;
            state.isSuccess = false;
            state.isLoading = false;
            state.user = null;
            state.message = payload;
          }),
          false,
          'rejected'
        ),
      logoutUser: () =>
        set(
          produce((state) => {
            removeFromStorage(tokenKey);
            state.user = null;
          }),
          false,
          'logout'
        ),
    })),
    { name: 'cart' }
  )
);
