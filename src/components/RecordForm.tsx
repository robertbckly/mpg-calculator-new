import React, { ChangeEvent, useState } from 'react';
import { Record } from '../types/record';

// I got this working! Mapping a union into an object
type InputFields = 'litres' | 'miles' | 'cost';
type InputErrors = {
  [field in InputFields]?: boolean;
};

export type DataFormProps = {
  value: Record;
  showFull?: boolean;
  onInputChange: (data: { input: string; value: any }) => void;
};

export function DataForm({ value, showFull, onInputChange }: DataFormProps) {
  const [errors, setErrors] = useState<InputErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    const isValid = input.checkValidity();
    onInputChange({ input: input.name, value: input.value });
    setErrors((currentErrors) => ({ ...currentErrors, [e.target.name]: !isValid }));
  };

  return (
    <form
      className="record-form"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Litres */}
      <label htmlFor="litres">
        <span>
          Litres
          {errors.litres ? '! ' : undefined}
        </span>
        <input
          type="number"
          name="litres"
          id="litres"
          step={0.01}
          min={0}
          value={value.litres}
          onChange={handleInputChange}
        />
      </label>

      {/* Miles */}
      <label htmlFor="miles">
        <span>
          Miles
          {errors.miles ? '! ' : undefined}
        </span>
        <input
          type="number"
          name="miles"
          id="miles"
          step={0.01}
          min={0}
          value={value.miles}
          onChange={handleInputChange}
        />
      </label>

      {/* Cost */}
      <label htmlFor="cost">
        <span>
          £
          {errors.cost ? '! ' : undefined}
        </span>
        <input
          type="number"
          name="cost"
          id="cost"
          step={0.01}
          min={0}
          value={value.cost}
          onChange={handleInputChange}
        />
      </label>

      {/* Extra inputs for full form */}
      {showFull
        && (
          <>
            {/* Date */}
            <label htmlFor="date">
              <span>Date</span>
              <input
                type="date"
                name="date"
                id="date"
                value={value.date}
                onChange={handleInputChange}
              />
            </label>

            {/* Location */}
            <label htmlFor="location">
              <span>Location</span>
              <input
                type="text"
                name="location"
                id="location"
                placeholder="Where did you fill up?"
                value={value.location}
                onChange={handleInputChange}
              />
            </label>
          </>
        )}
    </form>
  );
}

DataForm.defaultProps = { showFull: false };
