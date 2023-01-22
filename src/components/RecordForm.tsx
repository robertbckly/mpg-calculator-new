import React, { FormEvent } from 'react';
import { Record } from '../types/record';

export type RecordFormProps = {
  value: Record,
  onInputChange: (data: { input: string; value: any }) => void
};

export function RecordForm({ value, onInputChange }: RecordFormProps) {
  const handleInputChange = (e: FormEvent) => {
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    onInputChange({ input: input.name, value: input.value });
  };

  // Note: ensure each <input> `type` follows respective `FormData` type
  return (
    <>
      <h1>Fuel Calculator</h1>
      <form
        className="input-form"
        onSubmit={(e) => e.preventDefault()}
      >
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
      </form>
    </>
  );
}
