import React from 'react';
import { Record as RecordT } from '../../common/types/record';
import { costPerMile, milesPerGallon } from '../../common/utils/calculations';
import './record.css';

type RecordProps = {
  data: RecordT;
  onDelete: (id: RecordT['id']) => void;
};

export default function Record({ data, onDelete }: RecordProps) {
  const cpm = costPerMile(data);
  const mpgString = `${milesPerGallon(data)}mpg`;
  const cpmString = cpm ? ` – £${cpm} per mile` : null;
  return (
    <article className="record">
      {/* Replace with real description */}
      <h2 className="record__description">Description goes here...</h2>
      <p className="record__data">
        {mpgString}
        {cpmString}
      </p>
      <button type="button" onClick={() => onDelete(data.id)}>
        Delete
      </button>
    </article>
  );
}
