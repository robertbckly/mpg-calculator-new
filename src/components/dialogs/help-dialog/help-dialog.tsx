import { Dialog, DialogTitle, DialogActions } from '../common/common';
import './help-dialog.css';

type HelpDialogProps = {
  onClose: () => void;
};

export function HelpDialog({ onClose }: HelpDialogProps) {
  return (
    <Dialog onClose={onClose} a11yName="Help">
      <DialogTitle>What&apos;s this?</DialogTitle>

      <p className="help-dialog__para">
        MPG Calculator is a simple utility for calculating miles-per-gallon,
        built as a small React project by{' '}
        <a
          href="https://github.com/robertbckly"
          target="_blank"
          rel="noreferrer"
          className="author-link"
          aria-label="Rob Buckley (GitHub profile)"
        >
          @robertbckly
        </a>
        {' 👋.'}
      </p>

      <p className="help-dialog__para">
        It uses imperial gallons, as this is what&apos;s used in the UK (more
        info{' '}
        <a
          href="https://en.wikipedia.org/wiki/Gallon"
          target="_blank"
          rel="noreferrer"
          className="author-link"
          aria-label="Wikipedia entry for 'gallon'"
        >
          here
        </a>
        ).
      </p>

      <hr />

      <p className="help-dialog__para">
        The &apos;miles&apos; input accepts either a number or a simple
        subtraction expression (eg. 42 - 21). This makes it easy to input the
        start and end readings of your trip computer.
      </p>

      <p className="help-dialog__para">
        Saved records are stored within your browser until you clear its data.
        This app doesn&apos;t do anything else with the saved data, so records
        can&apos;t be accessed between devices.
      </p>

      <br />

      <DialogActions confirmButtonText="Close" onConfirm={onClose} />
    </Dialog>
  );
}
