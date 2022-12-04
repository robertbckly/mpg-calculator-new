import React, { useState } from 'react';
import { InputForm, InputFormData } from './InputForm';

const UK_GALLON_LITRES = 4.5461;
const MS_TIMEZONE_DIFF = new Date().getTimezoneOffset() * 60 * 1000;
const initInputData = {
  // Get YYYY-MM-DD substring from ISO date string
  // ...accounting for timezone difference,
  // ...because `toISOString()` converts to UTC time.
  date: new Date(Date.now() + MS_TIMEZONE_DIFF).toISOString().substring(0, 10),
  litres: 0,
  miles: 0,
  cost: 0,
  location: '',
};

export default function App() {
  // Input data
  const [inputData, setInputData] = useState<InputFormData>(initInputData);
  // Saved records
  const [recordList, setRecordList] = useState<InputFormData[]>([]);

  const handleInputChange = (data: { input: string; value: any }) => {
    setInputData((oldData) => ({ ...oldData, [data.input]: data.value }));
  };

  const handleSave = () => {
    // Save input
    setRecordList((exRecordList) => {
      const newRecordList = [...exRecordList];
      newRecordList.push(inputData);
      return newRecordList;
    });
    // Clear input
    setInputData(initInputData);
  };

  return (
    <>
      <InputForm
        value={inputData}
        onInputChange={handleInputChange}
      />
      <button type="button" onClick={handleSave}>Save</button>
      {/* OUTPUT */}
      {recordList && recordList.map((r) => (
        <div>
          <p>{`[${r.date}] ${r.litres}L @ ${r.location} (£${r.cost}): ${r.miles}mi`}</p>
          <p>{`= £${(r.cost / r.litres).toFixed(2)}/L`}</p>
          <p>{`= ${(r.miles / (r.litres / UK_GALLON_LITRES)).toFixed(2)}mpg`}</p>
          <p>{`= £${(r.cost / r.miles).toFixed(2)}/mi`}</p>
        </div>
      ))}
    </>
  );
}
