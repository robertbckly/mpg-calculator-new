import { ReactNode, useEffect, useRef } from 'react';
import './dialog.css';

type DialogProps = {
  a11yName: string;
  children?: ReactNode;
  onClose: () => void;
};

/**
 * Generic Dialog that opens automatically after rendering.
 * @param `DialogProps`
 */
export default function Dialog({ a11yName, children, onClose }: DialogProps) {
  const dialogElement = useRef<HTMLDialogElement>(null);

  // Calling `showModal()` achieves desired behaviour vs. using `open` attribute.
  useEffect(() => {
    if (!dialogElement.current?.open) {
      dialogElement.current?.showModal();
    }
  }, [dialogElement.current?.open]);

  // Dialog where modal=true has native methods for closing, hence use of `onClose()`
  return (
    <dialog ref={dialogElement} className="dialog" onClose={onClose} aria-label={a11yName}>
      {children}
    </dialog>
  );
}

Dialog.defaultProps = { children: null };
