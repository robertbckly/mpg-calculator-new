import './dialog-actions.css';

// TODO the defaultProps pattern is shit
// prefer default values applied to props object

export type DialogActionsProps = {
  cancelButtonText?: string;
  confirmButtonText?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DialogActions({
  cancelButtonText,
  confirmButtonText,
  onCancel,
  onConfirm,
}: DialogActionsProps) {
  return (
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
}

DialogActions.defaultProps = {
  cancelButtonText: 'Cancel',
  confirmButtonText: 'Save',
};
