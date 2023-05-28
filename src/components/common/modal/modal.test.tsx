import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Modal from './modal';

// Prevent Jest runtime error
jest.mock('./modal.css', () => {});

beforeAll(() => {
  // Mock HTML Dialog API as it's not fully implemented by jsdom
  HTMLDialogElement.prototype.showModal = function mock(this: HTMLDialogElement) {
    if (this.open) {
      throw new Error('called `showModal` while dialog was already open');
    }
    this.open = true;
  };
});

test('renders', () => {
  const name = 'example';
  render(<Modal a11yName={name} onClose={() => {}} />);
  expect(screen.getByRole('dialog', { name })).toBeVisible();
});

test("doesn't call `showModal()` when re-rendering", () => {
  const { rerender } = render(<Modal a11yName="example" onClose={() => {}} />);
  rerender(<Modal onClose={() => {}} a11yName="example" />);
  // (Would throw error and fail the test)
});

test('calls `onClose()` prop upon close', async () => {
  const onCloseMock = jest.fn();
  render(<Modal a11yName="example" onClose={onCloseMock} />);
  fireEvent(screen.getByRole('dialog'), new CloseEvent('close'));
  expect(onCloseMock).toHaveBeenCalled();
});
