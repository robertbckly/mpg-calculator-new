import React from 'react';
import { Record } from '../../common/types/record';
import { costPerMile, milesPerGallon } from '../../common/utils/calculations';

type OutputDisplayProps = { data: Record };

export default function OutputDisplay({ data }: OutputDisplayProps) {
  return (
    <div className="output">
      <p className="output-item output-item--large">
        <span className="wrap-text">{milesPerGallon(data)}</span>
        mpg
      </p>
      <p className="output-item">
        £
        <span className="wrap-text">{costPerMile(data)}</span>
        /mi
      </p>
    </div>
  );
}
