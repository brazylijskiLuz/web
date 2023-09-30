import { create } from "zustand";
import { User } from "@/models/user.model";

interface A11yStore {
  fontSize: number;
  setFontSize: (v: number) => void;
}

export const useA11yStore = create<A11yStore>((set) => ({
  fontSize: 16,
  setFontSize: (value) => {
    set({ fontSize: value });
  },
}));
