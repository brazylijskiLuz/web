import {isApiFieldsError, isApiMessageError} from "@/utils/error/errorGuards";

class CustomError extends Error {
    public key: string | null;
    constructor(message?: string, key?: string | null) {
        super(message);
        this.key = key || null;
    }
}


export const parseError = (e: unknown): CustomError => {
    if (typeof e === "string") {
        return new CustomError(e, null);
    }
    if (!(e instanceof Error)) {
        return new CustomError("Unknown error", null);
    }
    if (isApiMessageError(e)) {
        //@ts-ignore
        return new CustomError(e.response?.data.errors?.message, e.response?.data.errors?.key);
    }
    if (isApiFieldsError(e)) {
        //@ts-ignore
        const fields = e.response?.data.errors;
        if (!fields) {
            return new CustomError("Unknown error", null);
        }
        const firstKey = Object.keys(fields)[0];
        if (!firstKey) {
            return new CustomError("Unknown error", null);
        }
        const firstField = fields[firstKey];
        if (!firstField) {
            return new CustomError("Unknown error", null);
        }
        const [firstMessage] = firstField;
        return new CustomError(firstMessage, null);
    }

    let message = e.message;

    return new CustomError(message);
};
