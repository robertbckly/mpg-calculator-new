import { Record as TRecord } from '../../common/types/record';
import Record, { RecordProps } from './components/record/record';

export type RecordListProps = {
  records: TRecord[];
  onDelete: RecordProps['onDelete'];
};

export default function RecordList({ records, onDelete }: RecordListProps) {
  const haveRecords = Boolean(records.length);
  return (
    <section className="container container--record-list" aria-label="Saved MPG calculations">
      {!haveRecords && <p className="hint">Saved calculations will appear here.</p>}
      {haveRecords &&
        records.map((record) => <Record key={record.id} recordData={record} onDelete={onDelete} />)}
    </section>
  );
}
