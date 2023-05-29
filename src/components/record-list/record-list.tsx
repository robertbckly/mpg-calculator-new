import { Record as TRecord } from '../../common/types/record';
import Record, { RecordProps } from './components/record/record';
import '../app.css';
import './record-list.css';

export type RecordListProps = {
  records: TRecord[];
  onDelete: RecordProps['onDelete'];
};

export default function RecordList({ records, onDelete }: RecordListProps) {
  const haveRecords = Boolean(records.length);
  return (
    <section className="container container--record-list" aria-label="Saved MPG calculations">
      {!haveRecords && <p className="hint">Saved calculations will appear here.</p>}
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
