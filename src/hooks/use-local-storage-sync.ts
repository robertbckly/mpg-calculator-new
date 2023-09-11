import { useEffect, useState } from 'react';

/**
 * Read/write to a named localStorage entry.
 *
 * Note: this hook doesn't guarantee type safety. If the localStorage entry
 * has been unexpectedly mutated, then `data` might be a different type.
 *
 * @param storeName
 * @returns `[data, loading, update]`
 */
export function useLocalStorage<T extends any>(storeName: string) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const serialisedValue = window.localStorage.getItem(storeName);
    if (typeof serialisedValue === 'string') {
      setData(JSON.parse(serialisedValue));
    }
    setLoading(false);
  }, [storeName]);

  function update(newValue: T) {
    window.localStorage.setItem(storeName, JSON.stringify(newValue));
  }

  return [data, loading, update] as const;
}
