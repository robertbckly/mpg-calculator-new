import { FuelRecord } from '../../types/fuel-record';
import { milesPerGallon } from '../../utils/calculations';

type OutputDisplayProps = {
  data: FuelRecord;
  ariaBusy?: boolean;
};

export function OutputDisplay({ data, ariaBusy }: OutputDisplayProps) {
  const mpgString = milesPerGallon(data) || '-- ';

  return (
    <div className="output">
      <p
        className="output-item output-item--large"
        aria-live="polite"
        aria-atomic
        aria-busy={ariaBusy}
      >
        <span className="text-wrap">{mpgString}</span>mpg
      </p>
    </div>
  );
}
