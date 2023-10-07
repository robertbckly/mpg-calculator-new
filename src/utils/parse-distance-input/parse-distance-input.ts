/**
 * Parse user's input for distance, assuming format:
 * - '123'
 * - '456 - 123'
 * @param input raw user inputted string
 * @returns `input` cast to a number, or the difference (if `input` is
 * a subtraction expression)
 */
export const parseDistanceInput = (input: string | null): number => {
  // No or whitespace-only input
  if (!input || !input.trim()) {
    return 0;
  }

  // Splitting on '-' will capture operands of subtraction, but
  // also a negative number. This still works.
  const operands = input.split('-');
  const parsedOperands: number[] = [];

  // Parse string `operands`
  operands.forEach((operand, index) => {
    const parsedOperand = Number(operand.trim());

    if (Number.isNaN(parsedOperand)) {
      throw new Error('Invalid operand');
    }

    parsedOperands[index] = parsedOperand;
  });

  // Simple, single-number expression
  if (operands.length === 1) {
    return parsedOperands[0];
  }

  // 'Complex' expression
  const result = Math.abs(
    Number(parsedOperands[0]) - Number(parsedOperands[1])
  );

  // Avoid precision error
  return Number(result.toFixed(2));
};
