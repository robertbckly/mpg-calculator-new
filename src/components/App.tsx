import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Record from './Record';
import { DataForm } from './RecordForm';
import { Record as RecordT } from '../types/record';

/*
  TODO:
    - editing
    - form validation
    - aesthetics & polish
    - build & deploy
*/

const STORAGE_OBJECT_NAME = 'recordList';
const MS_TIMEZONE_DIFF = new Date().getTimezoneOffset() * 60 * 1000;
const INIT_INPUT_DATA: RecordT = {
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
  const [inputData, setInputData] = useState<RecordT>(INIT_INPUT_DATA);
  const [recordList, setRecordList] = useState<RecordT[]>([]);
  const [synced, setSynced] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // No state; so sync state with storage
    if (!synced) {
      const storedRecords = JSON.parse(window.localStorage.getItem(STORAGE_OBJECT_NAME));
      if (storedRecords?.length) setRecordList(storedRecords);
      setSynced(true);
      return;
    }
    // State updated; so sync storage with state
    window.localStorage.setItem(STORAGE_OBJECT_NAME, JSON.stringify(recordList));
  }, [recordList, synced]);

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

  const handleDelete = (id: string) => {
    setRecordList((list) => list.filter((record) => record.id !== id));
  };

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

      {recordList?.map((r) => (
        <Record
          key={r.id}
          id={r.id}
          date={r.date}
          litres={r.litres}
          miles={r.miles}
          location={r.location}
          cost={r.cost}
          onDelete={handleDelete}
        />
      ))}
    </>
  );
}
