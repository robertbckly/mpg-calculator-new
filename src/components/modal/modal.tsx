import React, { useRef } from 'react';
import './modal.css';

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function Modal({ open, onClose }: ModalProps) {
  const element = useRef<HTMLDialogElement>(null);

  // Prevent element throwing error if already open
  if (open && !element.current?.open) {
    element.current?.showModal();
  }

  return (
    <dialog
      className="modal"
      ref={element}
      open={open}
      onClose={() => onClose()}
    >
      <p>Example...</p>
      <form aria-label="Form to close the dialog." method="dialog">
        <button type="submit">Close</button>
      </form>
    </dialog>
  );
}
