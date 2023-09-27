import { ChangeEvent } from 'react';
import { FuelForm } from '../../types/types';
import './main-form.css';

const INPUT_CSS_CLASS_NAME = 'main-form__input';

const getInputClassName = (error?: boolean) =>
  INPUT_CSS_CLASS_NAME + (error ? ` ${INPUT_CSS_CLASS_NAME}--error` : '');

export type MainFormProps = {
  form: FuelForm;
  onChange: <K extends keyof FuelForm>(
    inputField: K,
    inputData: FuelForm[K]
  ) => void;
};

export function MainForm({ form, onChange }: MainFormProps) {
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    // Safe to assume type of `input.name` as it's defined in JSX below
    onChange(input.name as keyof Omit<FuelForm, 'id'>, {
      value: input.value,
      error: input.checkValidity() === false,
    });
  };

  return (
    <form className="main-form" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="volume" className="main-form__label">
        Litres *
        <input
          className={getInputClassName(form.volume.error)}
          type="number"
          name="volume"
          step={0.01}
          min={0}
          value={form.volume.value ?? ''}
          onInput={handleInput}
        />
      </label>
      <label htmlFor="distance" className="main-form__label">
        Miles *
        <input
          className={getInputClassName(form.distance.error)}
          type="number"
          name="distance"
          step={0.01}
          min={0}
          value={form.distance.value ?? ''}
          onInput={handleInput}
        />
      </label>
    </form>
  );
}
