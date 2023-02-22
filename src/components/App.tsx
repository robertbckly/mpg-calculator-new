import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Record from './Record';
import { DataForm } from './RecordForm';
import { Record as RecordT } from '../types/record';

/*
  TODO:
    - HTML / browser API form validation
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
  // TODO: this will only be calculated once, leading to possibly incorrect `date` at runtime!
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
  const [savingOpen, setSavingOpen] = useState(false);

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

  /**
   * Resets input form. Only clears input data if a record with ID is already saved
   * (to prevent data loss).
   *
   * Deleting a record will clear input data because the `recordList` state value will
   * still contain the record object at the time of calling `resetInput()`.
   *
   * @param force force input data to be cleared
   */
  const resetInput = (force = false) => {
    const recordIsSaved = recordList.findIndex((record) => record.id === inputData.id) >= 0;
    if (recordIsSaved || force) setInputData(INIT_INPUT_DATA);
    setSavingOpen(false);
  };

  const saveRecord = () => {
    const { id } = inputData;
    if (id) {
      // Update existing Record
      setRecordList((list) => {
        const newList = [...list];
        const indexToReplace = newList.findIndex((record) => record.id === id);
        newList[indexToReplace] = { ...inputData, id };
        return newList;
      });
    } else {
      // Create new Record
      setRecordList((exRecordList) => [...exRecordList, { ...inputData, id: uuid() }]);
    }

    resetInput(true);
  };

  const handleInputChange = (data: { input: string; value: any }) => {
    setInputData((oldData) => ({
      ...oldData,
      [data.input]: data.value,
    }));
  };

  /**
   * Handles save button's dual behaviour:
   * - first click: expand form (via `savingOpen`)
   * - second click: finally save all details
   */
  const handleSave = () => {
    if (!savingOpen) setSavingOpen(true);
    else saveRecord();
  };

  const handleEdit = (id: string) => {
    setInputData(recordList.filter((record) => record.id === id)[0]);
    setSavingOpen(true);
  };

  const handleDelete = (id: string) => {
    setRecordList((list) => list.filter((record) => record.id !== id));
    resetInput();
  };

  return (
    <>
      <h1>Fuel Calculator</h1>

      <DataForm value={inputData} showFull={savingOpen} onInputChange={handleInputChange} />

      <button type="button" onClick={handleSave}>
        {!savingOpen ? 'Save' : 'Done'}
      </button>

      {savingOpen && (
        <button type="button" onClick={() => { resetInput(); }}>
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
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
    </>
  );
}
