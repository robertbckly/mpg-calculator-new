import React, { ReactNode, useEffect, useRef } from 'react';
import './modal.css';

type ModalProps = {
  children?: ReactNode;
  accessibleName: string;
  onClose: () => void;
};

export default function Modal({ accessibleName, children, onClose }: ModalProps) {
  const dialogElement = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialogElement.current?.open) {
      dialogElement.current?.showModal();
    }
  }, [dialogElement.current?.open]);

  return (
    <dialog
      ref={dialogElement}
      className="modal"
      aria-label={accessibleName}
      onClose={() => onClose()}
    >
      {children}
    </dialog>
  );
}

Modal.defaultProps = { children: null };
