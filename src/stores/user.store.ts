import { create } from "zustand";
import { User } from "@/models/user.model";

interface UserStore {
  user: User | null;
  grayscale: boolean;
  setUser: (v: User | null) => void;
  setGrayscale: (v: boolean) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  grayscale: false,
  setGrayscale: (value: boolean) => {
    set({ grayscale: value });
  },
  setUser: (value) => {
    set({ user: value });
  },
}));
