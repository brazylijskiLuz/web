import { create } from "zustand";
import { AppLang } from "@/models/lang.model";

interface UserLanguage {
  lang: AppLang;
  setLang: (v: AppLang) => void;
}

export const useLanguageStore = create<UserLanguage>((set) => ({
  lang: "pl",
  setLang: (value) => {
    set({ lang: value });
  },
}));
