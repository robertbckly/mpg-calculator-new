import React, { useState } from 'react';
// import { v4 as uuid } from 'uuid';
// import Record from './Record';
import { InputForm } from './InputForm';
import { Record as RecordT } from '../types/record';

// const LOCAL_STORAGE_NAME = 'recordList';
const INIT_INPUT_DATA: RecordT = Object.freeze({
  id: null,
  volume: null,
  distance: null,
  cost: null,
  description: null,
});

export default function App() {
  const [inputData, setInputData] = useState<RecordT>(INIT_INPUT_DATA);
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

  // const handleInputChange = (data: { input: string; value: any }) => {
  //   setInputData((oldData) => ({
  //     ...oldData,
  //     [data.input]: data.value,
  //   }));
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

  return (
    <main className="wrapper">
      <div className="calculator">
        <InputForm
          value={inputData}
          onChange={({ input, value }) => setInputData({
            ...inputData,
            [input]: value,
          })}
        />
        <div className="calculator__output">
          <p>
            <span className="calculator__wrappable">
              0.00
            </span>
            mpg
          </p>
          <p>£00.00/mi</p>
        </div>
      </div>
    </main>
  );
}
