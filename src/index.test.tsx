import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';

it('does something', () => {
  const text = 'Hello!';
  render(<p>{text}</p>);
  expect(screen.getByText(text)).toBeVisible();
});
