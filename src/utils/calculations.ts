import { LITRES_PER_GALLON } from '../constants/constants';

export function milesPerGallon(miles: number, litres: number) {
  return miles && litres
    ? (miles / (litres / LITRES_PER_GALLON)).toFixed(2)
    : 0;
}
