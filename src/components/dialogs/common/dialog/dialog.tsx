import { ReactNode, useEffect, useRef } from 'react';
import './dialog.css';

type DialogProps = {
  a11yName: string;
  children?: ReactNode;
  onClose: () => void;
};

/**
 * Generic 'modal' dialog that opens automatically after rendering.
 */
export function Dialog({ a11yName, children, onClose }: DialogProps) {
  const dialogElement = useRef<HTMLDialogElement>(null);

  // Using `showModal()` instead of `open` attribute in order to create
  // a 'modal' dialog which has better a11y and keyboard control.
  useEffect(() => {
    if (!dialogElement.current?.open) {
      dialogElement.current?.showModal();
    }
  }, [dialogElement.current?.open]);

  return (
    <dialog ref={dialogElement} className="dialog" aria-label={a11yName} onClose={onClose}>
      {children}
    </dialog>
  );
}
