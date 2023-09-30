import {AxiosError} from "axios";

export const isAxiosError = <T = unknown>(e: any): e is AxiosError<T> => {
    return Boolean(e?.isAxiosError);
};

export const isApiMessageError = (
    e: unknown,
): e is AxiosError<{ message: string; key: string }> => {
    if (!isAxiosError(e)) {
        return false;
    }
    console.log(e)
    // @ts-ignore
    return typeof e.response?.data?.errors?.message === "string"
};

export const isApiFieldsError = (
    e: unknown,
): e is AxiosError<{ fields: { fields: Record<string, string[]> } }> => {
    if (!isAxiosError(e)) {
        return false;
    }
    // @ts-ignore
    const fields = e.response?.data?.errors;
    if (!fields) {
        return false;
    }
    const keys = Object.keys(fields);
    if (keys.length === 0) {
        return false;
    }
    const [key] = keys;
    if (!key) {
        return false;
    }
    if (!Array.isArray(fields[key])) {
        return false;
    }
    if (fields[key].length === 0) {
        return false;
    }
    return typeof fields[key][0] === "string";
};
