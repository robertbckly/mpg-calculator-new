import { FuelRecord } from './fuel-record';

/**
 * Note: input values are always strings because this is a form;
 * casting values upon input leads to poor UX.
 */
export type FuelForm = {
  [K in keyof Omit<FuelRecord, 'description'>]: {
    value: string | null;
    error?: boolean;
  };
};
