import { KeyboardEvent, useState } from 'react';
import { Dialog, DialogTitle, DialogActions } from '../common/common';
import './description-dialog.css';

type DescriptionDialogProps = {
  onSubmit: (description: string) => void;
  onClose: () => void;
};

const title = 'Enter a description (optional)';

export function DescriptionDialog({ onClose, onSubmit }: DescriptionDialogProps) {
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
    <Dialog onClose={onClose} a11yName={title}>
      <DialogTitle>{title}</DialogTitle>
      <input
        type="text"
        className="description-dialog__input"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <DialogActions confirmButtonText="Save" onCancel={onClose} onConfirm={handleSubmit} />
    </Dialog>
  );
}
