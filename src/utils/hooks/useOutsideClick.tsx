import { MutableRefObject, useEffect } from "react";

export function useOutsideClick(
  ref: MutableRefObject<any>,
  outsideClickFn: () => void,
) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (ref.current && !ref.current.contains(event.target)) {
        outsideClickFn();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, outsideClickFn]);
}
