import { FuelRecord } from '../../types/types';
import { Dialog, DialogTitle, DialogActions } from '../common/common';

type DeleteDialogProps = {
  record: FuelRecord;
  onDelete: () => void;
  onClose: () => void;
};

export function DeleteDialog({ record, onClose, onDelete }: DeleteDialogProps) {
  const description = record.description.length
    ? `"${record.description}"`
    : 'record';

  const title = `Delete ${description}?`;

  return (
    <Dialog onClose={onClose} a11yName={title}>
      <DialogTitle>{title}</DialogTitle>
      <br />
      <DialogActions
        confirmButtonText="Delete"
        onCancel={onClose}
        onConfirm={onDelete}
      />
    </Dialog>
  );
}
