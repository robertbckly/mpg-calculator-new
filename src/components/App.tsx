import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Record } from '../types/record';
import { DataForm } from './DataForm';

const STORAGE_OBJECT_NAME = 'recordList';
const UK_GALLON_LITRES = 4.5461;
const MS_TIMEZONE_DIFF = new Date().getTimezoneOffset() * 60 * 1000;
const INIT_INPUT_DATA: Record = {
  // Get YYYY-MM-DD substring from ISO date string
  // ...accounting for timezone difference,
  // ...because `toISOString()` converts to UTC time.
  id: null,
  date: new Date(Date.now() + MS_TIMEZONE_DIFF).toISOString().substring(0, 10),
  litres: 0,
  miles: 0,
  cost: 0,
  location: '',
};

export default function App() {
  const [inputData, setInputData] = useState<Record>(INIT_INPUT_DATA);
  const [recordList, setRecordList] = useState<Record[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // No state; so sync state with storage
    if (!recordList?.length) {
      const storedRecords = JSON.parse(window.localStorage.getItem(STORAGE_OBJECT_NAME));
      if (storedRecords?.length) setRecordList(storedRecords);
      return;
    }
    // State updated; so sync storage with state
    window.localStorage.setItem(STORAGE_OBJECT_NAME, JSON.stringify(recordList));
  }, [recordList]);

  const handleInputChange = (data: { input: string; value: any }) => {
    setInputData((oldData) => ({
      ...oldData,
      [data.input]: data.value,
    }));
  };

  const saveRecord = () => {
    // Save input
    setRecordList((exRecordList) => {
      const newRecordList = exRecordList ? [...exRecordList] : [];
      newRecordList.push({ ...inputData, id: uuid() });
      return newRecordList;
    });
    // Reset input
    setInputData(INIT_INPUT_DATA);
    setSaving(false);
  };

  const handleSave = () => {
    if (!saving) setSaving(true);
    else saveRecord();
  };

  const recordListElements = recordList?.map((r) => {
    const costPerLitre = (r.cost / r.litres).toFixed(3);
    const costPerMile = (r.cost / r.miles).toFixed(2);
    const milesPerGallon = (r.miles / (r.litres / UK_GALLON_LITRES)).toFixed(2);
    return (
      <div key={r.id}>
        <p>{`[${r.date}] ${r.litres}L @ ${r.location} (£${r.cost}): ${r.miles}mi`}</p>
        <p>{`= £${costPerLitre}/L`}</p>
        <p>{`= £${costPerMile}/mi`}</p>
        <p>{`= ${milesPerGallon}mpg`}</p>
      </div>
    );
  });

  return (
    <>
      <h1>Fuel Calculator</h1>

      <DataForm value={inputData} showFull={saving} onInputChange={handleInputChange} />

      <button type="button" onClick={handleSave}>
        {saving ? 'Done' : 'Save'}
      </button>

      {saving && (
      <button type="button" onClick={() => { setSaving(false); }}>
        Cancel
      </button>
      )}

      {recordListElements}
    </>
  );
}
