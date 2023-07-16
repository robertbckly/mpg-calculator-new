type Maybe<T> = T | null;

export type FuelRecord = {
  id: Maybe<string>;
  volume: Maybe<number>;
  distance: Maybe<number>;
  description: Maybe<string>;
};
