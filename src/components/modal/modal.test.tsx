import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Modal from './modal';

// Prevent Jest runtime error
jest.mock('./modal.css', () => {});

beforeAll(() => {
  // Mock dialog functionality as it's not in jsdom.
  let dialogOpen = false;
  HTMLDialogElement.prototype.showModal = function mock(
    this: HTMLDialogElement
  ) {
    if (dialogOpen) throw new Error("can't call twice");
    dialogOpen = true;
    this.open = true;
  };
});

test('renders when `open` is true', () => {
  render(<Modal open onClose={() => {}} />);
  expect(screen.getByRole('dialog')).toBeVisible();
});

test("doesn't render when `open` is false", () => {
  render(<Modal open={false} onClose={() => {}} />);
  expect(screen.queryByRole('dialog')).toBeNull();
});

test("doesn't throw error by calling `showModal()` again when re-rendering", () => {
  // Doesn't work unless `rerender` is called twice.
  // I think it retains context between calls? (Which is needed.)
  const { rerender } = render(<Modal open onClose={() => {}} />);
  rerender(<Modal open onClose={() => {}} />);
  rerender(<Modal open onClose={() => {}} />);
});

test('calls `onClose` prop onClose', async () => {
  const onCloseMock = jest.fn();
  render(<Modal open onClose={onCloseMock} />);
  fireEvent(screen.getByRole('dialog'), new CloseEvent('close'));
  expect(onCloseMock).toHaveBeenCalled();
});
