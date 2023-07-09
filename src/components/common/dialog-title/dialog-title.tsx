import { ReactNode } from 'react';
import './dialog-title.css';

export const DialogTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="dialog-title">{children}</h2>
);
