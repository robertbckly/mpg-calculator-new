import React, { useState } from 'react';
import { Record as RecordT } from '../../common/types/record';
import { costPerMile, milesPerGallon } from '../../common/utils/calculations';
import Dialog from '../common/dialog/dialog';
import './record.css';
import DialogActions from '../common/dialog-actions/dialog-actions';
import DialogTitle from '../common/dialog-title/dialog-title';

type RecordProps = {
  data: RecordT;
  onDelete: (id: RecordT['id']) => void;
};

export default function Record({ data, onDelete }: RecordProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const cpm = costPerMile(data);
  const mpgString = `${milesPerGallon(data)}mpg`;
  const cpmString = cpm ? ` – £${cpm} per mile` : null;

  const handleClose = () => {
    setShowDeleteDialog(false);
  };

  const handleDelete = () => {
    handleClose();
    onDelete(data.id);
  };

  return (
    <>
      <article className="record">
        {data.description && <h2 className="record__description">{data.description}</h2>}
        <p className="record__data">
          {mpgString}
          {cpmString}
        </p>
        <button type="button" onClick={() => setShowDeleteDialog(true)}>
          Delete
        </button>
      </article>

      {showDeleteDialog && (
        <Dialog a11yName="Confirm delete dialog" onClose={handleClose}>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <br />
          <DialogActions
            confirmButtonText="Delete"
            onCancel={handleClose}
            onConfirm={handleDelete}
          />
        </Dialog>
      )}
    </>
  );
}
