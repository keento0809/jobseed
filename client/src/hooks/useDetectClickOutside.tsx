import React, { useEffect, useRef, useState } from "react";

type props = {
  initialVisible: boolean;
};

const useDetectClickOutside = ({ initialVisible }: props) => {
  const [isComponentVisible, setIsComponentVisible] =
    useState<boolean>(initialVisible);
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutSide = (e: Event): void => {
    if (ref.current && ref.current.contains(e.target as Element)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide, true);
  }, [ref]);

  return { ref, isComponentVisible, setIsComponentVisible };
};

export default useDetectClickOutside;
