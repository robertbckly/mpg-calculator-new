import React from 'react';
import { Record as RecordT } from '../../common/types/record';
import { costPerMile, milesPerGallon } from '../../common/utils/calculations';
import './record.css';

type RecordProps = {
  data: RecordT;
  // onEdit: (id: string) => void;
  // onDelete: (id: string) => void;
};

export default function Record({ data }: RecordProps) {
  const mpg = milesPerGallon(data);
  const cpm = costPerMile(data);
  return (
    <article className="record">
      <h2 className="record__description">{data.description || 'Description'}</h2>
      <p className="record__data">{`${mpg}mpg – £${cpm}/mi`}</p>
    </article>
  );
}
