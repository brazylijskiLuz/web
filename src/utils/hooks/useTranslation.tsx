// Do NOT use the useTranslation export of react-i18next, but ONLY use of next-i18next!
import {useTranslation} from "next-i18next";

export const useT = (file?: string) => {
    return useTranslation(file)
}