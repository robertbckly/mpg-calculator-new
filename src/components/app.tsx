import React, { useState } from 'react';
import MainForm from './main-form/main-form';
import OutputDisplay from './output-display/output-display';
import { Record as RecordT } from '../common/types/record';
import './app.css';

const INIT_INPUT_DATA: RecordT = Object.freeze({
  id: null,
  volume: null,
  distance: null,
  cost: null,
  description: null,
});

export default function App() {
  const [inputData, setInputData] = useState<RecordT>(INIT_INPUT_DATA);

  const handleInputChange = (input: string, value: any) => {
    // Needs runtime validation (using browser APIs)
    // ...don't set state if invalid
    setInputData((data) => ({ ...data, [input]: value }));
  };

  const handleSave = () => alert('Not saved.');

  return (
    <main>
      <article className="container container--calculator">
        <MainForm value={inputData} onChange={handleInputChange} />

        <OutputDisplay data={inputData} />

        <button className="save-button" type="button" onClick={handleSave}>
          Save
        </button>
      </article>

      <article className="container container--records">
        <p>Saved records will appear here.</p>
      </article>
    </main>
  );
}

// BITS FROM BEFORE...

// const LOCAL_STORAGE_NAME = 'recordList';

// const [recordList, setRecordList] = useState<RecordT[]>([]);
// const [synced, setSynced] = useState(false);
// const [savingOpen, setSavingOpen] = useState(false);

// useEffect(() => {
//   // No state; so sync state with storage
//   if (!synced) {
//     const storedRecords = JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_NAME));
//     if (storedRecords?.length) setRecordList(storedRecords);
//     setSynced(true);
//     return;
//   }
//   // State updated; so sync storage with state
//   window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(recordList));
// }, [recordList, synced]);

// /**
//  * Resets input form. Only clears input data if a record with ID is already saved
//  * (to prevent data loss).
//  *
//  * Deleting a record will clear input data because the `recordList` state value will
//  * still contain the record object at the time of calling `resetInput()`.
//  *
//  * @param force force input data to be cleared
//  */
// const resetInput = (force = false) => {
//   const recordIsSaved = recordList.findIndex((record) => record.id === inputData.id) >= 0;
//   if (recordIsSaved || force) setInputData(INIT_INPUT_DATA);
//   setSavingOpen(false);
// };

// const saveRecord = () => {
//   const { id } = inputData;
//   if (id) {
//     // Update existing Record
//     setRecordList((list) => {
//       const newList = [...list];
//       const indexToReplace = newList.findIndex((record) => record.id === id);
//       newList[indexToReplace] = { ...inputData, id };
//       return newList;
//     });
//   } else {
//     // Create new Record
//     setRecordList((exRecordList) => [...exRecordList, { ...inputData, id: uuid() }]);
//   }

//   resetInput(true);
// };
// /**
//  * Handles save button's dual behaviour:
//  * - first click: expand form (via `savingOpen`)
//  * - second click: finally save all details
//  */
// const handleSave = () => {
//   if (!savingOpen) setSavingOpen(true);
//   else saveRecord();
// };

// const handleEdit = (id: string) => {
//   setInputData(recordList.filter((record) => record.id === id)[0]);
//   setSavingOpen(true);
// };

// const handleDelete = (id: string) => {
//   setRecordList((list) => list.filter((record) => record.id !== id));
//   resetInput();
// };
