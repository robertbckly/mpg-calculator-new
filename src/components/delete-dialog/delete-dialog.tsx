import Dialog from '../common/dialog/dialog';
import DialogTitle from '../common/dialog-title/dialog-title';
import DialogActions from '../common/dialog-actions/dialog-actions';
import { Record } from '../../common/types/record';

type DeleteDialogProps = {
  record: Record;
  onDelete: () => void;
  onClose: () => void;
};

export default function DeleteDialog({ record, onClose, onDelete }: DeleteDialogProps) {
  const title = `Delete "${record.description}"?`;
  return (
    <Dialog onClose={onClose} a11yName={title}>
      <DialogTitle>{title}</DialogTitle>
      <br />
      <DialogActions confirmButtonText="Delete" onCancel={onClose} onConfirm={onDelete} />
    </Dialog>
  );
}
