import React, { useState } from "react";

const useModal = () => {
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return { isOpen, onOpen, onClose };
};

export default useModal;
