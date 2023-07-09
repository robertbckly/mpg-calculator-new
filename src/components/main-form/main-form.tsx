import { ChangeEvent } from 'react';
import { Record } from '../../common/types/record';
import './main-form.css';

// type InputErrors = {
//   [field in keyof Record]?: boolean;
// };

type MainFormProps = {
  value: Record;
  onChange: (input: string, value: string) => void;
};

export const MainForm = ({ value, onChange }: MainFormProps) => {
  // const [errors, setErrors] = useState<InputErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target;
    onChange(input.name, input.value);
    // const isValid = input.checkValidity();
    // setErrors((currentErrors) => ({ ...currentErrors, [e.target.name]: !isValid }));
  };

  return (
    <form className="main-form" onSubmit={(e) => e.preventDefault()}>
      <label htmlFor="volume" className="main-form__label">
        Litres *
        <input
          className="main-form__input"
          type="number"
          name="volume"
          step={0.01}
          min={0}
          value={value.volume || ''}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="distance" className="main-form__label">
        Miles *
        <input
          className="main-form__input"
          type="number"
          name="distance"
          step={0.01}
          min={0}
          value={value.distance || ''}
          onChange={handleInputChange}
        />
      </label>
      <label htmlFor="cost" className="main-form__label">
        Cost (£)
        <input
          className="main-form__input"
          type="number"
          name="cost"
          step={0.01}
          min={0}
          value={value.cost || ''}
          onChange={handleInputChange}
        />
      </label>
    </form>
  );
};
