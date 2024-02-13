import { produce } from 'immer';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { AuthActionType, AuthStore } from '../types';
import {
  getFromStorage,
  removeFromStorage,
  setToStorage,
  tokenKey,
} from '../utils';

import { getJwt } from '../services/authService';

interface JwtPayload {
  exp: number;
}

const token = getJwt();
const user = getFromStorage(tokenKey);

const INITIAL_STATE = {
  user: user ?? null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

if (token) {
  const decoded = jwtDecode<JwtPayload>(token);
  const expiryDate = new Date().getTime();

  if (decoded.exp * 1000 < expiryDate) {
    removeFromStorage(tokenKey);
    INITIAL_STATE.user = null;
  }
}

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
            state.isLoading = INITIAL_STATE.isLoading;
            state.isError = INITIAL_STATE.isError;
            state.isSuccess = INITIAL_STATE.isSuccess;
            state.message = INITIAL_STATE.message;
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
            state.isLoading = false;
            state.user = payload;
            setToStorage(tokenKey, payload);
            state.isSuccess = true;
          }),
          false,
          'fulfilled'
        ),
      loginUserRejected: (payload) =>
        set(
          produce((state) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.user = null;
            state.message = payload;
          }),
          false,
          'rejected'
        ),
      googleLoginPending: () =>
        set(
          produce((state) => {
            state.isLoading = true;
          }),
          false,
          'pending'
        ),
      googleLoginFulfilled: (payload) =>
        set(
          produce((state) => {
            state.isLoading = false;
            state.user = payload;
            setToStorage(tokenKey, payload);
            state.isSuccess = true;
          }),
          false,
          'fulfilled'
        ),
      googleLoginRejected: (payload) =>
        set(
          produce((state) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
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
            state.isLoading = false;
            state.user = payload;
            setToStorage(tokenKey, payload);
            state.isSuccess = true;
          }),
          false,
          'fulfilled'
        ),
      registerUserRejected: (payload) =>
        set(
          produce((state) => {
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
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
      updateUserDataPending: () =>
        set(
          produce((state) => {
            state.isLoading = true;
          }),
          false,
          'loading'
        ),
      updateUserDataFulfilled: (payload) =>
        set(
          produce((state) => {
            state.isLoading = false;
            state.user = payload;
            setToStorage(tokenKey, payload);
            state.isSuccess = true;
          }),
          false,
          'fulfilled'
        ),
      updateUserDataRejected: (payload) =>
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
      updateUserEmailPending: () =>
        set(
          produce((state) => {
            state.isLoading = true;
          }),
          false,
          'loading'
        ),
      updateUserEmailFulfilled: (payload) =>
        set(
          produce((state) => {
            state.isLoading = false;
            state.user = payload;
            setToStorage(tokenKey, payload);
            state.isSuccess = true;
          }),
          false,
          'fulfilled'
        ),
      updateUserEmailRejected: (payload) =>
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
      updateUserPasswordPending: () =>
        set(
          produce((state) => {
            state.isLoading = true;
          }),
          false,
          'loading'
        ),
      updateUserPasswordFulfilled: (payload) =>
        set(
          produce((state) => {
            state.isLoading = false;
            state.user = payload;
            setToStorage(tokenKey, payload);
            state.isSuccess = true;
          }),
          false,
          'fulfilled'
        ),
      updateUserPasswordRejected: (payload) =>
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
      deleteUserPending: () =>
        set(
          produce((state) => {
            state.isLoading = true;
          }),
          false,
          'loading'
        ),
      deleteUserFulfilled: () =>
        set(
          produce((state) => {
            state.isLoading = false;
            state.user = null;
            removeFromStorage(tokenKey);
            state.isSuccess = true;
          }),
          false,
          'fulfilled'
        ),
      deleteUserRejected: (payload) =>
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
    })),
    { name: 'auth' }
  )
);
