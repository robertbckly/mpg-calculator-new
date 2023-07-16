import { FuelRecord } from '../types/fuel-record';
import { litresPerGallon } from '../constants/litres-per-gallon';

export function milesPerGallon(data: FuelRecord) {
  return data.distance && data.volume
    ? (data.distance / (data.volume / litresPerGallon)).toFixed(2)
    : 0;
}
