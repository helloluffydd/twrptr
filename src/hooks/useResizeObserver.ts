import { useRef, useEffect, useState, RefObject } from 'react';

interface ResizeObserverEntry {
  target: Element;
  contentRect: DOMRectReadOnly;
  borderBoxSize: ReadonlyArray<ResizeObserverSize>;
  contentBoxSize: ReadonlyArray<ResizeObserverSize>;
  devicePixelContentBoxSize?: ReadonlyArray<ResizeObserverSize>;
}

interface ResizeObserverSize {
  inlineSize: number;
  blockSize: number;
}

interface Dimensions {
  width: number;
  height: number;
}

const useResizeObserver = <T extends HTMLElement>(
  ref: RefObject<T | null>
): Dimensions => {
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!ref.current) return;

    const observeTarget = ref.current;

    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      if (!Array.isArray(entries) || !entries.length) return;

      const entry = entries[0];
      const { width, height } = entry.contentRect;

      setDimensions({ width, height });
    });

    observer.observe(observeTarget);
    resizeObserver.current = observer;

    return () => {
      if (resizeObserver.current) {
        resizeObserver.current.disconnect();
      }
    };
  }, [ref]);

  return dimensions;
};

export default useResizeObserver;
