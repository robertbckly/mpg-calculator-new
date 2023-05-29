import { ReactNode } from 'react';
import './dialog-title.css';

export default function DialogTitle({ children }: { children: ReactNode }) {
  return <h2 className="dialog-title">{children}</h2>;
}
