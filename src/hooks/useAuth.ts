import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { produce } from 'immer';
import jwtDecode from 'jwt-decode';

import { AuthActionType, AuthStore } from '../types';

const INITIAL_STATE = {
  user: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

export const useAuth = create<AuthStore & AuthActionType>()((set) => ({
  user: INITIAL_STATE.user,
  isLoading: INITIAL_STATE.isLoading,
  isError: INITIAL_STATE.isError,
  isSuccess: INITIAL_STATE.isSuccess,
  message: INITIAL_STATE.message,
}));
