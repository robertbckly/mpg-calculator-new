import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Modal from './modal';

// Prevent Jest runtime error
jest.mock('./modal.css', () => {});

beforeAll(() => {
  // Mock <dialog> API as it's not fully implemented by jsdom.
  HTMLDialogElement.prototype.showModal = function mock(this: HTMLDialogElement) {
    if (this.open) {
      throw new Error('called `showModal` more than once while dialog was open');
    }
    this.open = true;
  };
});

test('renders', () => {
  render(<Modal accessibleName="example" onClose={() => {}} />);
  expect(screen.getByRole('dialog')).toBeVisible();
});

test("doesn't call `showModal()` when re-rendering", () => {
  const { rerender } = render(<Modal accessibleName="example" onClose={() => {}} />);
  rerender(<Modal onClose={() => {}} accessibleName="example" />);
  // Would throw error and fail the test
});

test('calls `onClose` prop onClose', async () => {
  const onCloseMock = jest.fn();
  render(<Modal accessibleName="example" onClose={onCloseMock} />);
  fireEvent(screen.getByRole('dialog'), new CloseEvent('close'));
  expect(onCloseMock).toHaveBeenCalled();
});
