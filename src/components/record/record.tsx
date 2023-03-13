import React from 'react';
import { Record as RecordT } from '../../common/types/record';
import { costPerMile, milesPerGallon } from '../../common/utils/calculations';
import './record.css';

type RecordProps = {
  data: RecordT;
  onDelete: (id: RecordT['id']) => void;
};

export default function Record({ data, onDelete }: RecordProps) {
  const mpg = milesPerGallon(data);
  const cpm = costPerMile(data);
  return (
    <article className="record">
      {/* Temporarily using ID as description */}
      <h2 className="record__description">{data.id}</h2>
      <p className="record__data">{`${mpg}mpg – £${cpm}/mi`}</p>
      <button type="button" onClick={() => onDelete(data.id)}>Delete</button>
    </article>
  );
}
