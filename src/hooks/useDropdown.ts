import {
  useEffect,
  useState,
  RefObject,
  Dispatch,
  SetStateAction,
} from 'react';

interface UseDropdown {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const useDropdown = <T extends HTMLElement>(
  dropdownRef: RefObject<T | null>
): UseDropdown => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownRef]);

  return { isOpen, setIsOpen };
};

export default useDropdown;
