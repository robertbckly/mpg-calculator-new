import React from 'react';
import { Record } from '../../common/types/record';
import { costPerMile, milesPerGallon } from '../../common/utils/calculations';

type OutputDisplayProps = { data: Record };

export default function OutputDisplay({ data }: OutputDisplayProps) {
  const mpg = milesPerGallon(data);
  const cpm = costPerMile(data);
  const mpgValueString = mpg || '-- ';
  const cpmValueString = cpm || ' -- ';

  return (
    <div className="output">
      <p className="output-item output-item--large">
        <span className="wrap-text">{mpgValueString}</span>
        mpg
      </p>
      <p className="output-item">
        £
        <span className="wrap-text">{cpmValueString}</span>
        /mi
      </p>
    </div>
  );
}
