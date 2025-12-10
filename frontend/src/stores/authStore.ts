import { defineStore } from 'pinia';
import { getToastStatus, TYPES_OF_TOAST } from '@/utils/toastUtils';
import { authService } from '@/services/auth.service';
import { IGetUser, ILoginRequest, ILoginResponse } from '@/types';

interface AuthState {
  currentUser: ILoginResponse | undefined;
  myUser: IGetUser | undefined;
}

export const useAuthStore = defineStore('auth', {
  state(): AuthState {
    return {
      currentUser: undefined,
      myUser: undefined,
    };
  },

  getters: {
    getCurrentUser: (state) => state.currentUser,
    getMyUser: (state) => state.myUser,
  },

  actions: {
    async login(data: ILoginRequest) {
      await authService
        .login(data)
        .then((response) => {
          if (
            response &&
            response.token &&
            response.user &&
            response.user.email
          ) {
            this.currentUser = response;
          }
        })
        .catch((error) => {
          getToastStatus(TYPES_OF_TOAST.ERROR, error);
        });
    },
    async logout() {
      this.$reset();
      await authService.logout();
    },
    async getMe() {
      await authService.getMe().then((response) => {
        this.myUser = response;
      });
    },
  },

  persist: {
    pick: ['currentUser', 'myUser'],
  },
});
