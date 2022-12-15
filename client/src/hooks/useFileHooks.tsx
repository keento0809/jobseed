import React, { ChangeEventHandler, useRef } from "react";

const fileImage = new Image();

const UseFileHooks = () => {
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleFiles: ChangeEventHandler<HTMLInputElement> = (e) => {
    const imageContainer = imageContainerRef.current;
    if (!imageContainer) return;
    const files = e.currentTarget.files;
    if (!files || files?.length === 0) return;
    const file = files[0];
    fileImage.src = window.URL.createObjectURL(file);
    imageContainer.appendChild(fileImage);
  };
  return { handleFiles, imageContainerRef };
};

export default UseFileHooks;
