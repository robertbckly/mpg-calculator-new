import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Modal from './modal';

// Prevent Jest runtime error
jest.mock('./modal.css', () => {});

test('renders when `open` is true', () => {
  render(<Modal open onClose={() => {}} />);
  expect(screen.getByRole('dialog')).toBeVisible();
});

test("doesn't render when `open` is false", () => {
  render(<Modal open={false} onClose={() => {}} />);
  expect(screen.queryByRole('dialog')).toBeNull();
});

test("doesn't call `showModal()` again when re-rendering", () => {
  const { rerender } = render(<Modal open onClose={() => {}} />);
  rerender(<Modal open onClose={() => {}} />);
  // this needs an assertion?
});

test('calls `onClose` prop onClose', async () => {
  const onCloseMock = jest.fn();
  render(<Modal open onClose={onCloseMock} />);
  fireEvent(screen.getByRole('dialog'), new CloseEvent('close'));
  expect(onCloseMock).toHaveBeenCalled();
});
