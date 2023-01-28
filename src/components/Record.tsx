import React from 'react';
import { Record as RecordT } from '../types/record';

export type RecordProps = RecordT & {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const UK_GALLON_LITRES = 4.5461;

export default function Record({
  id, date, litres, miles, location, cost, onEdit, onDelete,
}: RecordProps) {
  const costPerLitre = (cost / litres).toFixed(3);
  const costPerMile = (cost / miles).toFixed(2);
  const milesPerGallon = (miles / (litres / UK_GALLON_LITRES)).toFixed(2);
  return (
    <div className="record">
      <p>{`[${date}] ${litres}L @ ${location} (£${cost}): ${miles}mi`}</p>
      <p>{`= £${costPerLitre}/L`}</p>
      <p>{`= £${costPerMile}/mi`}</p>
      <p>{`= ${milesPerGallon}mpg`}</p>
      <button type="button" onClick={() => onEdit(id)}>Edit</button>
      <button type="button" onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}
