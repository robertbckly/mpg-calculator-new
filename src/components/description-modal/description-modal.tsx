import React from 'react';
import Modal from '../common/modal/modal';

export default function DescriptionModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal onClose={onClose} accessibleName="xyz">
      <form aria-label="Enter a description." method="dialog" className="desc-form">
        <h2 className="desc-form__title">Enter a description</h2>
        <input type="text" name="description" className="desc-form__input" />
        <div className="desc-form__actions">
          <button
            type="submit"
            name="cancel"
            className="desc-form__button desc-form__button--cancel"
          >
            Cancel
          </button>
          <button type="submit" name="save" className="desc-form__button">
            Save
          </button>
        </div>
      </form>
    </Modal>
  );
}
