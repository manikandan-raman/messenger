import { useCallback, useRef } from "react";

export const useIntersectionObserver = (callback, deps) => {
  const observer = useRef(null);

  const ref = useCallback(
    (node) => {
      if (deps.every(Boolean)) {
        observer.current?.disconnect();
        observer.current = new IntersectionObserver((entries) => {
          if (entries[0].isIntersecting) {
            callback();
          }
        });
        if (node) {
          observer.current.observe(node);
        }
      }
    },
    [deps, callback]
  );

  return ref;
};
