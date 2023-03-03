import React, { ChangeEvent } from 'react';
import { Record } from '../types/record';
import './main-form.css';

// type InputErrors = {
//   [field in keyof Record]?: boolean;
// };

export type MainFormProps = {
  value: Record;
  onChange: (data: { input: string; value: any }) => void;
};

export function MainForm({ value, onChange }: MainFormProps) {
  // const [errors, setErrors] = useState<InputErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    onChange({ input: input.name, value: input.value });
    // const isValid = input.checkValidity();
    // setErrors((currentErrors) => ({ ...currentErrors, [e.target.name]: !isValid }));
  };

  return (
    <form className="main-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="volume" className="main-form__label">
        Volume
        <input
          className="main-form__input"
          type="number"
          name="volume"
          step={0.01}
          min={0}
          value={value.volume || undefined}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="distance" className="main-form__label">
        Distance
        <input
          className="main-form__input"
          type="number"
          name="distance"
          step={0.01}
          min={0}
          value={value.distance || undefined}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="cost" className="main-form__label">
        Cost
        <input
          className="main-form__input"
          type="number"
          name="cost"
          step={0.01}
          min={0}
          value={value.cost || undefined}
          onChange={handleInputChange}
        />
      </label>
    </form>
  );
}
