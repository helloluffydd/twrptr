import { useEffect, useState, RefObject } from 'react';
import useResizeObserver from './useResizeObserver';

interface UseDynamicVisibleItems {
  dynamicVisibleItems: number;
}

const useDynamicVisibleItems = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  options = {
    offsetWidth: 40,
    avgItemWidth: 90
  }
): UseDynamicVisibleItems => {
  const [dynamicVisibleItems, setDynamicVisibleItems] = useState(1);
  const selectedItemsDimensions = useResizeObserver(ref);

  const { offsetWidth, avgItemWidth } = options;

  useEffect(() => {
    const { width } = selectedItemsDimensions;

    if (width > 0) {
      const availableWidth = width - offsetWidth;
      const newVisibleItems = Math.max(
        1,
        Math.floor(availableWidth / avgItemWidth)
      );

      if (newVisibleItems !== dynamicVisibleItems) {
        setDynamicVisibleItems(newVisibleItems);
      }
    }
  }, [selectedItemsDimensions]);

  return { dynamicVisibleItems };
};

export default useDynamicVisibleItems;
