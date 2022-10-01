import { useState } from "react";

export default () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = async (onClose: () => Promise<void> | void) => {
    await onClose();
    setIsOpen(false);
  };

  const open = () => setIsOpen(true);

  return { isOpen, open, handleClose };
};
