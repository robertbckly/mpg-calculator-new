import { Record } from '../types/record';
import { litresPerGallon } from '../constants/litres-per-gallon';

export function milesPerGallon(data: Record) {
  return data.distance && data.volume
    ? (data.distance / (data.volume / litresPerGallon)).toFixed(2)
    : 0;
}

export function costPerMile(data: Record) {
  return data.cost && data.distance ? (data.cost / data.distance).toFixed(2) : 0;
}
