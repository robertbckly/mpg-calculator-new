import { parseDistanceInput } from './parse-distance-input';

/**
 *
 * Simple input = '123'
 * Complex input = '456 - 123'
 *
 */

it('converts `null` input to 0', () => {
  expect(parseDistanceInput(null)).toBe(0);
});

it('converts empty string input to 0', () => {
  expect(parseDistanceInput('')).toBe(0);
});

it('converts single whitespace to 0', () => {
  expect(parseDistanceInput(' ')).toBe(0);
});

it('converts multiple whitespace to 0', () => {
  expect(parseDistanceInput('  ')).toBe(0);
});

it('converts simple, valid input to number', () => {
  expect(parseDistanceInput('21')).toBe(21);
});

it('converts simple, valid floating-point input to number', () => {
  expect(parseDistanceInput('21.5')).toBe(21.5);
});

it('converts complex, valid input to number', () => {
  expect(parseDistanceInput('42 - 21')).toBe(21);
});

it('converts complex, valid floating-point input to number', () => {
  expect(parseDistanceInput('42.5 - 21.5')).toBe(21);
});

it('outputs same number regardless of operand order', () => {
  expect(parseDistanceInput('21 - 42')).toBe(21);
});

it('converts complex, valid input without whitespace to number', () => {
  expect(parseDistanceInput('42-21')).toBe(21);
});

it('converts complex input missing left operand to number', () => {
  expect(parseDistanceInput('- 42')).toBe(42);
});

it('converts complex input missing left operand and whitespace to number (negative -> positive)', () => {
  expect(parseDistanceInput('-42')).toBe(42);
});

it('converts complex input missing right operand and whitespace to number', () => {
  expect(parseDistanceInput('42-')).toBe(42);
});

it('converts simple input with trailing `.` to number', () => {
  expect(parseDistanceInput('42.')).toBe(42);
});

it('converts complex input with x2 trailing `.` to number', () => {
  expect(parseDistanceInput('42. - 21.')).toBe(21);
});

it('avoids floating-point precision error', () => {
  // Expression typically doesn't evaluate to `0.2` unless using `toFixed()`
  expect(parseDistanceInput('0.3 - 0.1')).toBe(0.2);
});

it('throws error when simple input is invalid', () => {
  expect(() => {
    parseDistanceInput('abc');
  }).toThrow();
});

it('throws error when left operand is invalid', () => {
  expect(() => {
    parseDistanceInput('abc - 123');
  }).toThrow();
});

it('throws error when right operand is invalid', () => {
  expect(() => {
    parseDistanceInput('123 - abc');
  }).toThrow();
});

it('throws error when there are too many operands', () => {
  expect(() => {
    parseDistanceInput('123 - 456 - 789');
  }).toThrow();
});
