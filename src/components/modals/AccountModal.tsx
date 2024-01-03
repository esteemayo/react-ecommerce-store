import DeleteAccount from '../accounts/DeleteAccount';
import Modal from './Modal';
import useAccountModal from '@/hooks/useAccountModal';

const AccountModal = () => {
  const { isOpen, onClose } = useAccountModal();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <DeleteAccount onCancel={onClose} />
    </Modal>
  );
}

export default AccountModal;
