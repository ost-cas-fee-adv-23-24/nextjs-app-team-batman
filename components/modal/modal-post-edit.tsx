'use client';
import { Modal } from '@ost-cas-fee-adv-23-24/design-system-component-library-team-batman';

interface IModalPostEdit {
  modalState: boolean;
  setModalState: (state: boolean) => void;
}

export const ModalPostEdit = ({ modalState, setModalState }: IModalPostEdit) => {
  return (
    <>
      <Modal
        isOpen={modalState}
        onClose={() => {
          setModalState(!modalState);
        }}
        onSubmit={() => {
          setModalState(!modalState);
        }}
        width="m"
        title="Post Edit"
      >
        Post Edit
      </Modal>
    </>
  );
};
