import { toast as reactToast } from "react-hot-toast";

export const toast = {
    success: (message: string, duration: number = 3000) => {
        reactToast.custom(message, {
            duration,
        });
    },

    error: (message: string, duration: number = 3000) => {
        reactToast.error(message, {
            duration,
        });
        //OR we can make custom
        // reactToast.custom((t) => (
        //     <div
        //         className={`${
        //             t.visible ? 'animate-enter' : 'animate-leave'
        //         } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        //     >
        //         <div className="flex-1 w-0 p-4">
        //             <p>test</p>
        //         </div>
        //         <div className="flex border-l border-gray-200">
        //             <button
        //                 onClick={() => reactToast.dismiss(t.id)}
        //                 className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        //             >
        //                 Close
        //             </button>
        //         </div>
        //     </div>
        // ), {
        //     duration
        // })
    },
};
