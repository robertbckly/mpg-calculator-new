import React, { useState } from 'react';
import Form, { FormData } from './Form';

const msTimezoneDiff = (new Date().getTimezoneOffset() * 60 * 1000);

export default function App() {
  // Form data
  const [formData, setFormData] = useState<FormData>({
    // Get YYYY-MM-DD substring from ISO date string
    // ...accounting for timezone difference, because
    // `toISOString()` converts to UTC time.
    date: new Date(Date.now() + msTimezoneDiff).toISOString().substring(0, 10),
    litres: 0,
    miles: 0,
    cost: 0,
    location: '',
  });

  const handleInputChange = (data: { input: string; value: any }) => {
    setFormData((oldData) => ({ ...oldData, [data.input]: data.value }));
  };

  return (
    <Form
      value={formData}
      onInputChange={handleInputChange}
    />
  );
}
