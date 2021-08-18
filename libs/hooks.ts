import { useRef } from "react";
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useAppDispatch } from "../src/store/hooks";

type Cleanup = void | (() => void);
export type Size = { width: number; height: number };
export type Position = { x: number; y: number };
export type Intersection = {
  intersectionRatio: number;
  isIntersecting: boolean;
  offsetBoundingRect: DOMRectReadOnly;
};
type IntersectionOptions = {
  rootMargin?: string;
  threshold?: number | number[];
};
type VisibleScroll = {
  offsetBoundingRect: DOMRectReadOnly;
  x: number;
  y: number;
};

export function runCleanup(cleanup: Cleanup) {
  if (cleanup instanceof Function) {
    cleanup();
  }
}

export function windowSizeEffect(
  effect: (width: number, height: number) => Cleanup
): () => void {
  let cleanup: Cleanup;
  const onResize = () => {
    runCleanup(cleanup);
    cleanup = effect(window.innerWidth, window.innerHeight);
  };
  window.addEventListener("resize", onResize);
  onResize();
  return () => {
    runCleanup(cleanup);
    window.removeEventListener("resize", onResize);
  };
}

// Always pass in a callback made with useCallback!
export function useWindowSizeEffect(
  effect: (width: number, height: number) => Cleanup,
  deps: any[]
) {
  useEffect(() => windowSizeEffect(effect), deps);
}

export function useWindowSize(): Size | undefined {
  const [windowSize, setWindowSize] = useState<Size>();
  useWindowSizeEffect((width, height) => setWindowSize({ width, height }), []);
  return windowSize;
}

export function windowScrollEffect(
  effect: (x: number, y: number) => Cleanup
): () => void {
  let cleanup: Cleanup;
  const onScroll = () => {
    runCleanup(cleanup);
    cleanup = effect(window.scrollX, window.scrollY);
  };
  document.addEventListener("scroll", onScroll);
  onScroll();
  return () => {
    runCleanup(cleanup);
    document.removeEventListener("scroll", onScroll);
  };
}

// Always pass in a callback made with usecallback!
export function useWindowScrollEffect(
  effect: (x: number, y: number) => Cleanup,
  deps: any[]
) {
  useEffect(() => windowScrollEffect(effect), deps);
}

export function useWindowScroll(): Position | undefined {
  const [scroll, setScroll] = useState<Position>();
  useWindowScrollEffect((x, y) => setScroll({ x, y }), []);
  return scroll;
}

export function animationFrameEffect(effect: () => Cleanup): () => void {
  let cleanup: Cleanup;
  const frameId = window.requestAnimationFrame(() => {
    runCleanup(cleanup);
    cleanup = effect();
  });
  return () => {
    runCleanup(cleanup);
    window.cancelAnimationFrame(frameId);
  };
}

// cb should be created with useCallback
export function useAnimationFrameEffect(effect: () => Cleanup, deps: any[]) {
  useEffect(() => animationFrameEffect(effect), deps);
}

export function intersectionObserverEffect(
  element: RefObject<Element>,
  effect: (intersection: Intersection) => Cleanup,
  options?: IntersectionOptions
): () => void {
  let cleanup: Cleanup;
  const observer = new IntersectionObserver(
    (entries) => {
      runCleanup(cleanup);
      const boundingRect = entries[0].boundingClientRect;
      const top = boundingRect.top + window.scrollY;
      const left = boundingRect.left + window.scrollX;

      cleanup = effect({
        intersectionRatio: entries[0].intersectionRatio,
        isIntersecting: entries[0].isIntersecting,
        offsetBoundingRect: new DOMRectReadOnly(
          left,
          top,
          boundingRect.width,
          boundingRect.height
        ),
      });
    },
    {
      root: null,
      rootMargin: options?.rootMargin,
      threshold: options?.threshold,
    }
  );
  if (element.current) {
    observer.observe(element.current);
  }
  return () => {
    runCleanup(cleanup);
    observer.disconnect();
  };
}

// ensure that usecallback is passed in!
export function useIntersectionEffect(
  element: RefObject<Element>,
  effect: (intersection: Intersection) => void,
  deps: any[],
  options?: IntersectionOptions
) {
  const { rootMargin, threshold } = options ?? {
    rootMargin: undefined,
    threshold: undefined,
  };
  useEffect(
    () =>
      intersectionObserverEffect(element, effect, { rootMargin, threshold }),
    [element, rootMargin, threshold, ...deps]
  );
}

export function useIntersection(
  element: RefObject<Element>,
  options?: IntersectionOptions
): Intersection | undefined {
  const [intersection, setIntersection] = useState<Intersection>();
  useIntersectionEffect(element, setIntersection, [], options);
  return intersection;
}

export function useVisibleScrollEffect(
  element: RefObject<Element>,
  effect: (offsetBoundingRect: DOMRectReadOnly, x: number, y: number) => void,
  deps: any[],
  options?: IntersectionOptions
) {
  useIntersectionEffect(
    element,
    (intersection) => {
      if (intersection.isIntersecting) {
        return windowScrollEffect(() =>
          effect(
            intersection.offsetBoundingRect,
            window.scrollX,
            window.scrollY
          )
        );
      }
    },
    deps,
    options
  );
}

export function useVisibleScroll(
  element: RefObject<Element>,
  options?: IntersectionOptions
) {
  const [visibleScroll, setVisibleScroll] = useState<VisibleScroll>();
  useVisibleScrollEffect(
    element,
    (offsetBoundingRect, x, y) =>
      setVisibleScroll({ offsetBoundingRect, x, y }),
    [],
    options
  );
  return visibleScroll;
}

export const useOutsideAlerter = (
  ref: RefObject<Element>,
  action: { setState?: Dispatch<SetStateAction<boolean>>; dispatch?: any }
) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (action?.setState) {
          action.setState(false);
        } else {
          dispatch(action.dispatch());
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
};

export const useCardBgColor = (FeedBacks: any[], colors: string[]) => {
  const [_feedbacks, setFeedback] = useState<any[]>([]);

  useEffect(() => {
    const res = [];
    let finalRes = [];

    for (let i = 0; i < FeedBacks.length; i += 4) {
      const chunk = FeedBacks.slice(i, i + 4);
      res.push(chunk);
    }
    finalRes = res.map((re) => {
      return re.map((r, i) => {
        return { ...r, cardClr: colors[i] };
      });
    });

    setFeedback(finalRes.flat(1));
  }, []);

  return { _feedbacks };
};

export function usePrevious<T>(
  value: T
): MutableRefObject<T | undefined>["current"] {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
