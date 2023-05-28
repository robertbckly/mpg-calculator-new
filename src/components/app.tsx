import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { Record as RecordT } from '../common/types/record';
import DescriptionModal from './description-modal/description-modal';
import MainForm from './main-form/main-form';
import OutputDisplay from './output-display/output-display';
import Record from './record/record';
import './app.css';

/**
 * NOW:
 * - Using <sections> with headings... can I hide these but keep good accessibility?
 * - Finish modals
 * - <Record /> should hide the `Delete` button in a `...` menu
 * - Add input validation
 */

const LOCAL_STORAGE_NAME = 'recordList';
const ARIA_BUSY_DELAY_MS = 3000;
const INIT_INPUT_DATA: RecordT = Object.freeze({
  id: null,
  volume: null,
  distance: null,
  cost: null,
  description: null,
});

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputData, setInputData] = useState<RecordT>(INIT_INPUT_DATA);
  const [recordList, setRecordList] = useState<RecordT[]>([]);
  const [synced, setSynced] = useState(false);
  const [ariaBusy, setAriaBusy] = useState(false);

  const savingEnabled = Boolean(inputData.volume && inputData.distance);

  useEffect(() => {
    // Sync state with storage on first load
    if (!synced) {
      const serialisedRecords = window.localStorage.getItem(LOCAL_STORAGE_NAME);
      if (serialisedRecords?.length) {
        setRecordList(JSON.parse(serialisedRecords));
      }
      setSynced(true);
    } else {
      // Sync storage with state on change
      window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(recordList));
    }
  }, [synced, recordList]);

  // Delay ARIA announcement until after last input
  useEffect(() => {
    setAriaBusy(true);
    const timeout = setTimeout(() => setAriaBusy(false), ARIA_BUSY_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [inputData]);

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
    if (!savingEnabled) {
      return;
    }
    const newRecord: RecordT = { ...inputData, id: uuid() };
    setRecordList((records) => [newRecord, ...records]);
    resetInput();
    // Example
    setModalOpen(true);
  };

  const handleDelete = (id: RecordT['id']) => {
    if (!id) {
      return;
    }
    setRecordList((records) => records.filter((record) => record.id !== id));
  };

  return (
    <main>
      {modalOpen && <DescriptionModal onClose={() => setModalOpen(false)} />}

      <section
        className="container container--calculator"
        aria-label="MPG calculator input and output"
      >
        <MainForm value={inputData} onChange={handleInputChange} />
        <OutputDisplay data={inputData} ariaBusy={ariaBusy} />
        <button
          type="button"
          className="save-button"
          onClick={handleSave}
          disabled={!savingEnabled}
        >
          Save
        </button>
      </section>

      <section className="container container--records" aria-label="Saved MPG calculations">
        {!recordList.length ? (
          <p className="hint">Saved calculations will appear here.</p>
        ) : (
          recordList.map((record) => (
            <Record key={record.id} data={record} onDelete={handleDelete} />
          ))
        )}
      </section>
    </main>
  );
}
