import './dialog-actions.css';

type DialogActionsProps = {
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
};

export function DialogActions({
  cancelButtonText = 'Cancel',
  confirmButtonText = 'Save',
  onCancel,
  onConfirm,
}: DialogActionsProps) {
  return (
    <div className="dialog-actions">
      {onCancel ? (
        <button
          type="button"
          className="dialog-actions__button dialog-actions__button--cancel"
          onClick={onCancel}
        >
          {cancelButtonText}
        </button>
      ) : null}
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
