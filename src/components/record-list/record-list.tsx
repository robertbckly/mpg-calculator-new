import { FuelRecord } from '../../types/types';
import { Record, RecordProps } from './components/record/record';
import './record-list.css';

export type RecordListProps = {
  records: FuelRecord[];
  onDelete: RecordProps['onDelete'];
};

export function RecordList({ records, onDelete }: RecordListProps) {
  const haveRecords = Boolean(records.length);
  return (
    <section
      className="container container--record-list"
      aria-label="Saved MPG calculations"
    >
      {!haveRecords && (
        <p className="hint">Saved calculations will appear here.</p>
      )}
      {haveRecords && (
        <ul className="record-list">
          {records.map((record) => (
            <Record key={record.id} recordData={record} onDelete={onDelete} />
          ))}
        </ul>
      )}
    </section>
  );
}
