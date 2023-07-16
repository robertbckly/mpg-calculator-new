import { useEffect, useState } from 'react';

// This didn't go so well...
// need to consider how this plays with existing state in the consumer

export function useLocalStorageSync(objectName: string) {
  const [data, setData] = useState<any>();

  useEffect(() => {
    // Initial sync
    if (typeof data === 'undefined') {
      const serialisedObject = window.localStorage.getItem(objectName);
      if (serialisedObject?.length) {
        setData(JSON.parse(serialisedObject));
      } else {
        // Set `null` to show that store has been checked and nothing found
        setData(null);
      }
    }
  }, [data, objectName]);

  function updateLocalStorage(newValue: any) {
    window.localStorage.setItem(objectName, JSON.stringify(newValue));
  }

  return [data, updateLocalStorage];
}
