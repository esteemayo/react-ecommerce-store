import UpdateData from '../accounts/UpdateData';
import Modal from './Modal';
import useEmailModal from '@/hooks/useEmailModal';

const DataModal = () => {
  const { isOpen, onClose } = useEmailModal();

  return (
    <Modal
      title='Change your email address'
      isOpen={isOpen}
      onClose={onClose}
    >
      <UpdateData onCancel={onClose} />
    </Modal>
  );
}

export default DataModal;
