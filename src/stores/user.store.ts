import { create } from "zustand";
import { User } from "@/models/user.model";

interface UserStore {
  user: User | null;
  setUser: (v: User | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (value) => {
    set({ user: value });
  },
}));
