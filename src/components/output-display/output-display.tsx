import React from 'react';
import LITRES_PER_GALLON_UK from '../../common/constants/litres-per-gallon';
import { Record } from '../../common/types/record';

type OutputDisplayProps = { data: Record };

export default function OutputDisplay({ data }: OutputDisplayProps) {
  const mpg = data.distance && data.volume
    ? (data.distance / (data.volume / LITRES_PER_GALLON_UK)).toFixed(2)
    : '0';

  const mpp = data.cost && data.distance
    ? (data.cost / data.distance).toFixed(2)
    : '0';

  return (
    <div className="output">
      <p className="output-item output-item--large">
        <span className="wrap-text">{mpg}</span>
        mpg
      </p>
      <p className="output-item">
        £
        <span className="wrap-text">{mpp}</span>
        /mi
      </p>
    </div>
  );
}
