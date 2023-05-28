import React, { ReactNode, useEffect, useRef } from 'react';
import './modal.css';

type ModalProps = {
  a11yName: string;
  children?: ReactNode;
  onClose: () => void;
};

/**
 * Generic Modal; opens automatically after rendering.
 * @param `ModalProps`
 */
export default function Modal({ a11yName, children, onClose }: ModalProps) {
  const dialogElement = useRef<HTMLDialogElement>(null);

  // Calling `showModal()` achieves desired behaviour vs. using `open` attribute.
  useEffect(() => {
    if (!dialogElement.current?.open) {
      dialogElement.current?.showModal();
    }
  }, [dialogElement.current?.open]);

  return (
    <dialog
      ref={dialogElement}
      className="modal"
      aria-label={a11yName}
      onClose={() => onClose()}
    >
      {children}
    </dialog>
  );
}

Modal.defaultProps = { children: null };
