import React, { ComponentProps } from "react";

interface ErrorComponentProps extends ComponentProps<"div"> {
    msg: string;
}

const ErrorComponent = ({ msg, ...props }: ErrorComponentProps) => {
    return (
        <div
            {...props}
            className="absolute -bottom-5 left-1/2 z-30 flex min-w-[200px] -translate-x-1/2 cursor-pointer rounded-3xl bg-red-50 py-1 text-BLACK shadow-xl"
        >
            <span className="w-full text-center text-xs font-normal">{msg}</span>
        </div>
    );
};

export default ErrorComponent;
