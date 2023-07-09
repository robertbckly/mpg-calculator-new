import './dialog-actions.css';

type DialogActionsProps = {
  cancelButtonText?: string;
  confirmButtonText?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export const DialogActions = ({
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Save',
  onCancel,
  onConfirm,
}: DialogActionsProps) => (
  <div className="dialog-actions">
    <button
      type="button"
      className="dialog-actions__button dialog-actions__button--cancel"
      onClick={onCancel}
    >
      {cancelButtonText}
    </button>
    <button
      type="button"
      className="dialog-actions__button dialog-actions__button--confirm"
      onClick={onConfirm}
    >
      {confirmButtonText}
    </button>
  </div>
);
