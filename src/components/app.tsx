import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Record as RecordT } from '../common/types/record';
import MainForm from './main-form/main-form';
import OutputDisplay from './output-display/output-display';
import Record from './record/record';
import './app.css';

/**
 * NOW:
 * - work on <Record /> to hide the delete button in a `...` menu
 * - work on validation
 */

const LOCAL_STORAGE_NAME = 'recordList';
const INIT_INPUT_DATA: RecordT = Object.freeze({
  id: null,
  volume: null,
  distance: null,
  cost: null,
  description: null,
});

export default function App() {
  const [inputData, setInputData] = useState<RecordT>(INIT_INPUT_DATA);
  const [recordList, setRecordList] = useState<RecordT[]>([]);
  const [synced, setSynced] = useState(false);

  const savingEnabled = Boolean(inputData.volume && inputData.distance);

  useEffect(() => {
    // Sync state with storage on first load
    if (!synced) {
      const serialisedRecords = window.localStorage.getItem(LOCAL_STORAGE_NAME);
      if (serialisedRecords?.length) setRecordList(JSON.parse(serialisedRecords));
      setSynced(true);
    } else {
      // Sync storage with state on change
      window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(recordList));
    }
  }, [synced, recordList]);

  const resetInput = () => setInputData(INIT_INPUT_DATA);

  const handleInputChange = (input: string, value: string) => {
    // Needs runtime validation (using browser APIs)
    // ...don't set state if invalid
    let castValue: string | number = value;
    if (input === 'volume' || input === 'distance' || input === 'cost') {
      castValue = Number(value);
    }
    setInputData((data) => ({ ...data, [input]: castValue }));
  };

  const handleSave = () => {
    if (!savingEnabled) return;
    const newRecord: RecordT = { ...inputData, id: uuid() };
    setRecordList((records) => ([newRecord, ...records]));
    resetInput();
  };

  const handleDelete = (id: RecordT['id']) => {
    if (!id) return;
    setRecordList((records) => records.filter((record) => record.id !== id));
  };

  return (
    <main>

      <article className="container container--calculator">
        <MainForm value={inputData} onChange={handleInputChange} />
        <OutputDisplay data={inputData} />
        <button
          type="button"
          className="save-button"
          onClick={handleSave}
          disabled={!savingEnabled}
        >
          Save
        </button>
      </article>

      <article className="container container--records">
        {!recordList.length
          ? <p className="hint">Saved calculations will appear here.</p>
          : recordList.map((record) => (
            <Record
              key={record.id}
              data={record}
              onDelete={handleDelete}
            />
          ))}
      </article>

    </main>
  );
}
