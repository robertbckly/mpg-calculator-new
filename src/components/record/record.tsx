import React from 'react';
import { Record as RecordT } from '../../types/record';

export type RecordProps = RecordT & {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const UK_GALLON_LITRES = 4.5461;

export default function Record({
  id, date, litres, miles, location, cost, onEdit, onDelete,
}: RecordProps) {
  const output = {
    litres: Number(litres).toFixed(2),
    miles: Number(miles).toFixed(2),
    cost: Number(cost).toFixed(2),
    costPerLitre: (cost / litres).toFixed(3),
    costPerMile: (cost / miles).toFixed(2),
    milesPerGallon: (miles / (litres / UK_GALLON_LITRES)).toFixed(2),
  };

  return (
    <div className="record">
      <p style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{`${date} @ ${location}`}</p>
      <p style={{ fontWeight: 'bold' }}>{`${output.litres}L / £${output.cost} / ${output.miles}mi`}</p>
      <p style={{ fontWeight: 'bold' }}>
        {`£${output.costPerLitre}/L / £${output.costPerMile}/mi / ${output.milesPerGallon}mpg`}
      </p>
      <button type="button" onClick={() => onEdit(id)}>Edit</button>
      <button type="button" onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}
