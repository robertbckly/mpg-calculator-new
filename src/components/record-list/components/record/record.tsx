import { useState } from 'react';
import { FuelRecord } from '../../../../types/fuel-record';
import { milesPerGallon } from '../../../../utils/calculations';
import { DeleteDialog } from '../../../delete-dialog/delete-dialog';
import './record.css';

export type RecordProps = {
  recordData: FuelRecord;
  onDelete: (id: FuelRecord['id']) => void;
};

export function Record({ recordData, onDelete }: RecordProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const mpgString = `${milesPerGallon(recordData)}mpg`;

  const handleDialogClose = () => {
    setShowDeleteDialog(false);
  };

  const handleDelete = () => {
    handleDialogClose();
    onDelete(recordData.id);
  };

  return (
    <li className="record">
      <div>
        {recordData.description && (
          <h2 className="record__description">{recordData.description}</h2>
        )}
        <p className="record__data">{mpgString}</p>
      </div>

      <button
        type="button"
        className="record__delete-button"
        onClick={() => setShowDeleteDialog(true)}
        aria-label="Delete"
      >
        X
      </button>

      {showDeleteDialog && (
        <DeleteDialog
          record={recordData}
          onDelete={handleDelete}
          onClose={() => setShowDeleteDialog(false)}
        />
      )}
    </li>
  );
}
