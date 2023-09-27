import { FuelForm } from '../../types/types';
import { milesPerGallon } from '../../utils/calculations';

type OutputDisplayProps = {
  data: FuelForm;
  ariaBusy?: boolean;
};

export function OutputDisplay({ data, ariaBusy }: OutputDisplayProps) {
  const mpgString =
    milesPerGallon(
      Number(data.distance.value) || 0,
      Number(data.volume.value) || 0
    ) || '-- ';

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
