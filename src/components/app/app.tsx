import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FuelRecord } from '../../types/fuel-record';
import { ARIA_BUSY_DELAY_MS, LOCAL_STORAGE_NAME } from '../../constants/constants';
import { useLocalStorage } from '../../hooks/use-local-storage-sync';
import { DescriptionDialog } from '../description-dialog/description-dialog';
import { MainForm } from '../main-form/main-form';
import { OutputDisplay } from '../output-display/output-display';
import { RecordList } from '../record-list/record-list';
import './app.css';

/**
 * -- TODO --
 * -> Add loading context to prevent user input app-wide
 * -> Add expression parsing in miles field... so that I can do (end - start)
 * -> Add record editing (load into calculator; fields populated; saving overwrites)
 * -> Add feedback for invalid input
 * -> Check aria announcement has been implemented properly (maybe use off-screen announcement text?)
 * -> Improve UI + UX
 * -> Build + deploy
 * --      --
 */

const INIT_INPUT_DATA: FuelRecord = Object.freeze({
  id: null,
  volume: null,
  distance: null,
  description: null,
});

export function App() {
  const [savedData, loadingSavedData, updateSavedData] =
    useLocalStorage<FuelRecord[]>(LOCAL_STORAGE_NAME);
  const [inputData, setInputData] = useState<FuelRecord>(INIT_INPUT_DATA);
  const [recordList, setRecordList] = useState<FuelRecord[]>([]);
  const [synced, setSynced] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [ariaBusy, setAriaBusy] = useState(false);

  const savingEnabled = Boolean(inputData.volume && inputData.distance);

  // Initial load from localStorage
  if (!loadingSavedData && !synced) {
    if (Array.isArray(savedData)) {
      setRecordList(savedData);
    }
    setSynced(true);
  }

  // Save any changes to localStorage
  useEffect(() => {
    if (synced) {
      updateSavedData(recordList);
    }
  }, [recordList, synced, updateSavedData]);

  // Delay ARIA announcement until after last input
  useEffect(() => {
    setAriaBusy(true);
    const timeout = setTimeout(() => setAriaBusy(false), ARIA_BUSY_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [inputData]);

  const resetInput = () => {
    setInputData(INIT_INPUT_DATA);
  };

  const saveRecord = (description: string) => {
    if (!savingEnabled) {
      return;
    }
    const newRecord: FuelRecord = { ...inputData, id: uuid(), description };
    setRecordList((records) => [newRecord, ...records]);
    resetInput();
  };

  const deleteRecord = (id: FuelRecord['id']) => {
    if (!id) {
      return;
    }
    setRecordList((records) => records.filter((record) => record.id !== id));
  };

  const handleInputChange = (input: string, value: string) => {
    // Needs runtime validation (using browser APIs)
    // ...don't set state if invalid
    let castValue: string | number = value;
    if (input === 'volume' || input === 'distance') {
      castValue = Number(value);
    }
    setInputData((data) => ({ ...data, [input]: castValue }));
  };

  const handleSaveConfirmation = (description: string) => {
    saveRecord(description);
    setShowSaveDialog(false);
  };

  return (
    <main>
      <section className="container container--calculator" aria-label="MPG calculator">
        <MainForm value={inputData} onChange={handleInputChange} />
        <OutputDisplay data={inputData} ariaBusy={ariaBusy} />

        <button
          type="button"
          disabled={!savingEnabled}
          className="save-button"
          onClick={() => setShowSaveDialog(true)}
        >
          Save
        </button>
      </section>

      <RecordList records={recordList} onDelete={(id: string | null) => deleteRecord(id)} />

      {showSaveDialog && (
        <DescriptionDialog
          onSubmit={handleSaveConfirmation}
          onClose={() => setShowSaveDialog(false)}
        />
      )}
    </main>
  );
}
