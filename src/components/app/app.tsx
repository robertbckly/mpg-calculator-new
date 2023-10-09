import { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { FuelForm, FuelRecord } from '../../types/types';
import {
  ARIA_BUSY_DELAY_MS,
  LOCAL_STORAGE_NAME,
} from '../../constants/constants';
import { useLocalStorage } from '../../hooks/use-local-storage-sync';
import { parseDistanceInput } from '../../utils/utils';
import { MainForm, MainFormProps } from '../main-form/main-form';
import { OutputDisplay } from '../output-display/output-display';
import { RecordList } from '../record-list/record-list';
import { HelpDialog, SaveDialog } from '../dialogs/dialogs';
import './app.css';

/**
 * -- TODO --
 * -> Improve deploy process (GitHub Actions)
 * -> Move form to non-controlled inputs, using FormData API ?
 * --      --
 */

const INIT_FORM_DATA = Object.freeze<FuelForm>({
  distance: { value: null },
  volume: { value: null },
});

export function App() {
  const [savedData, loadingSavedData, updateSavedData] =
    useLocalStorage<FuelRecord[]>(LOCAL_STORAGE_NAME);
  const [form, setForm] = useState<FuelForm>(INIT_FORM_DATA);
  const [recordList, setRecordList] = useState<FuelRecord[]>([]);
  const [synced, setSynced] = useState(false);
  const [showHelpDialog, setShowHelpDialog] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [ariaBusy, setAriaBusy] = useState(false);

  const canSave = Boolean(
    form.volume.value &&
      !form.volume.error &&
      form.distance.value &&
      !form.distance.error
  );

  // Initial load from localStorage
  if (!loadingSavedData && !synced) {
    if (Array.isArray(savedData)) {
      setRecordList(savedData);
    }
    setSynced(true);
  }

  // Save any changes to `recordList` to localStorage
  if (synced && savedData !== recordList) {
    updateSavedData(recordList);
  }

  // Delay ARIA announcement until after last input
  useEffect(() => {
    setAriaBusy(true);
    const timeout = setTimeout(() => setAriaBusy(false), ARIA_BUSY_DELAY_MS);
    return () => clearTimeout(timeout);
  }, [form]);

  const saveRecord = (description: string) => {
    if (!canSave) {
      return;
    }

    let distance: number;

    // Note: this is a fail-safe. The distance input will have already been
    // parsed by `MainForm` and any error already caught, preventing the user
    // from saving the record. This means that this function could never be
    // called, and an error never thrown by `parseDistanceInput()`.
    try {
      distance = parseDistanceInput(form.distance.value);
    } catch {
      distance = 0;
    }

    const newRecord: FuelRecord = {
      id: uuid(),
      description,
      distance,
      volume: Number(form.volume.value) || 0,
    };
    // Prepend to `recordList`
    setRecordList((records) => [newRecord, ...records]);
    // Reset input
    setForm(INIT_FORM_DATA);
  };

  const deleteRecord = (id: FuelRecord['id']) => {
    if (!id) {
      return;
    }
    setRecordList((records) => records.filter((record) => record.id !== id));
  };

  const handleMainFormChange: MainFormProps['onChange'] = (
    inputField,
    inputData
  ) => {
    setForm((oldForm) => ({
      ...oldForm,
      [inputField]: { ...inputData },
    }));
  };

  const handleSaveConfirmation = (description: string) => {
    saveRecord(description);
    setShowSaveDialog(false);
  };

  return (
    <>
      <header>
        <h1>
          MPG Calculator <span>UK</span>
        </h1>
        <button
          type="button"
          className="help-button"
          aria-label="Get more information about this app"
          onClick={() => setShowHelpDialog(true)}
        >
          ?
        </button>
      </header>

      <main>
        <section
          className="container container--calculator"
          aria-label="MPG calculator"
        >
          <MainForm form={form} onChange={handleMainFormChange} />
          <OutputDisplay data={form} ariaBusy={ariaBusy} />

          <button
            type="button"
            disabled={!canSave}
            className="save-button"
            onClick={() => setShowSaveDialog(true)}
          >
            Save
          </button>
        </section>

        <RecordList records={recordList} onDelete={(id) => deleteRecord(id)} />
      </main>

      {showHelpDialog && (
        <HelpDialog onClose={() => setShowHelpDialog(false)} />
      )}

      {showSaveDialog && (
        <SaveDialog
          onSubmit={handleSaveConfirmation}
          onClose={() => setShowSaveDialog(false)}
        />
      )}
    </>
  );
}
