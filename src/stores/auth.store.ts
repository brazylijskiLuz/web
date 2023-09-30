import { create } from "zustand";
import {AuthStorage} from "@/features/admin/auth/auth-storage";

type Token = string | null;

interface AuthStore {
    token: Token;
    setToken: (value: Token) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    token: null,
    setToken: (value) => {
        if (value) {
            AuthStorage.setToken(value);
        } else {
            AuthStorage.removeToken();
        }

        set({ token: value });
    },
}));
