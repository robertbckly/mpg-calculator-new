import { KeyboardEvent, useState } from 'react';
import { Dialog, DialogTitle, DialogActions } from '../common/common';
import './save-dialog.css';

const TITLE = 'Enter a description (optional)';

type SaveDialogProps = {
  onSubmit: (description: string) => void;
  onClose: () => void;
};

export function SaveDialog({ onClose, onSubmit }: SaveDialogProps) {
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit(description);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Dialog onClose={onClose} a11yName={TITLE}>
      <DialogTitle>{TITLE}</DialogTitle>
      <input
        type="text"
        className="description-dialog__input"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <DialogActions
        confirmButtonText="Save"
        onCancel={onClose}
        onConfirm={handleSubmit}
      />
    </Dialog>
  );
}
