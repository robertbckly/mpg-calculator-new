import React, { FormEvent } from 'react';
import { Record } from '../types/record';

/*

*** TODO ***

Add editing using this second form.
Add deleting.

Make it look nice.

Ship.

*/

export type DataFormProps = {
  value: Record;
  showFull?: boolean;
  onInputChange: (data: { input: string; value: any }) => void;
};

export function DataForm({ value, showFull, onInputChange }: DataFormProps) {
  const handleInputChange = (e: FormEvent) => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    onInputChange({ input: input.name, value: input.value });
  };

  return (
    <form
      className="record-form"
      onSubmit={(e) => e.preventDefault()}
    >
      {/* Litres */}
      <label htmlFor="litres">
        <span>Litres</span>
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
        <span>Miles</span>
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
        <span>£</span>
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
