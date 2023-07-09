import { Record } from '../../common/types/record';
import { Dialog, DialogTitle, DialogActions } from '../common/common';

type DeleteDialogProps = {
  record: Record;
  onDelete: () => void;
  onClose: () => void;
};

export const DeleteDialog = ({ record, onClose, onDelete }: DeleteDialogProps) => {
  const title = `Delete ${record.description?.length ? `"${record.description}"` : 'record'}?`;
  return (
    <Dialog onClose={onClose} a11yName={title}>
      <DialogTitle>{title}</DialogTitle>
      <br />
      <DialogActions confirmButtonText="Delete" onCancel={onClose} onConfirm={onDelete} />
    </Dialog>
  );
};
