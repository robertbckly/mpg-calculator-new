import { FuelRecord } from '../types/fuel-record';
import { LITRES_PER_GALLON } from '../constants/constants';

export function milesPerGallon(data: FuelRecord) {
  return data.distance && data.volume
    ? (data.distance / (data.volume / LITRES_PER_GALLON)).toFixed(2)
    : 0;
}
