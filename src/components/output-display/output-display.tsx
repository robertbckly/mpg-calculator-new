import { FuelRecord } from '../../types/fuel-record';
import { costPerMile, milesPerGallon } from '../../utils/calculations';

type OutputDisplayProps = {
  data: FuelRecord;
  ariaBusy?: boolean;
};

export function OutputDisplay({ data, ariaBusy }: OutputDisplayProps) {
  const mpg = milesPerGallon(data);
  const cpm = costPerMile(data);
  const mpgValueString = mpg || '-- ';
  const cpmValueString = cpm || ' -- ';

  return (
    <div className="output">
      <p
        className="output-item output-item--large"
        aria-live="polite"
        aria-atomic
        aria-busy={ariaBusy}
      >
        <span className="text-wrap">{mpgValueString}</span>mpg
      </p>
      <p className="output-item">
        £<span className="text-wrap">{cpmValueString}</span> per mile
      </p>
    </div>
  );
}
