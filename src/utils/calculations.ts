import { LITRES_PER_GALLON } from '../constants/constants';

/**
 * Calculate MPG as fixed-point number with 2 fraction digits
 * @param miles
 * @param litres
 * @returns mpg
 */
export function milesPerGallon(miles: number, litres: number) {
  return miles && litres
    ? (miles / (litres / LITRES_PER_GALLON)).toFixed(2)
    : 0;
}
