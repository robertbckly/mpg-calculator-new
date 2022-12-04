import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import InputForm from './InputForm';

const inputs = [
  'date',
  'litres',
  'miles',
  'location',
  '£',
];

it('renders a form with required inputs', () => {
  render(<InputForm />);
  inputs.forEach((input) => {
    expect(screen.getByLabelText(RegExp(input, 'i'))).toBeVisible();
  });
});
