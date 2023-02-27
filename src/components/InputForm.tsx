import React, { ChangeEvent } from 'react';
import { Record } from '../types/record';

// type InputErrors = {
//   [field in keyof Record]?: boolean;
// };

export type InputFormProps = {
  value: Record;
  onChange: (data: { input: string; value: any }) => void;
};

export function InputForm({ value, onChange }: InputFormProps) {
  // const [errors, setErrors] = useState<InputErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    onChange({ input: input.name, value: input.value });
    // const isValid = input.checkValidity();
    // setErrors((currentErrors) => ({ ...currentErrors, [e.target.name]: !isValid }));
  };

  return (
    <form className="calculator__input-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="volume">
        Volume
        <input
          type="number"
          name="volume"
          step={0.01}
          min={0}
          value={value.volume}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="distance">
        Distance
        <input
          type="number"
          name="distance"
          step={0.01}
          min={0}
          value={value.distance}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="cost">
        Cost
        <input
          type="number"
          name="cost"
          step={0.01}
          min={0}
          value={value.cost}
          onChange={handleInputChange}
        />
      </label>
    </form>
  );
}
